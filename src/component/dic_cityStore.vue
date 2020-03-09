<template>
	<div class="dic_cityStore" v-loading="loading">
		<el-card shadow="hover">
			<el-form ref="form" :inline="true" :model="storeForm" label-width="80px" v-if="isAdd">
				<div>
					<el-form-item label="省份">
						<el-select v-model="storeForm.province" placeholder="省份" clearable>
							<el-option v-for="(v,i) in provinceList" :key="i" :label="v.pname" :value="v.pid"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="城市">
						<el-select v-model="storeForm.city" placeholder="请选择活动区域" clearable>
							<el-option v-for="(v,i) in cityList" :key="i" :label="v.cname" :value="v.cid"></el-option>
						</el-select>
					</el-form-item>
				</div>
				<div>
					<el-form-item label="门店">
						<el-select v-model="storeForm.store" placeholder="省份" clearable>
							<el-option v-for="(v,i) in storeList" :key="i" :label="v.shopName" :value="v.doorId"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="跟进人">
						<el-select v-model="storeForm.person" placeholder="请选择活动区域" clearable>
							<el-option v-for="(v,i) in personList" :key="i" :label="v.userName" :value="v.uId"></el-option>
						</el-select>
					</el-form-item>
				</div>
				<div></div>
			</el-form>
			<el-form ref="form" :inline="true" :model="storeForm" label-width="80px" v-else>
				<div>
					<el-form-item label="门店">
						<el-select v-model="storeForm.store" placeholder="请选择门店" clearable>
							<el-option v-for="(v,i) in storeList" :key="i" :label="v.shopName" :value="v.doorId"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="跟进人">
						<el-select v-model="storeForm.person" placeholder="请选择" clearable>
							<el-option v-for="(v,i) in personList" :key="i" :label="v.userName" :value="v.uId"></el-option>
						</el-select>
					</el-form-item>
					<div class="input-block">
						<el-form-item label="说明" label-width="100px">
							<el-input
								style="width:547px"
								type="textarea"
								:rows="2"
								placeholder="请输入内容"
								v-model="storeForm.explain"
							></el-input>
						</el-form-item>
					</div>
				</div>
			</el-form>
			<!-- 在表格中显示 -->
			<el-table-column
				v-if="searchType == 'details'"
				:prop="dataInfo.model"
				:label="dataInfo.columnComment"
				:width="dataInfo.options.width===''?'auto':dataInfo.options.width"
			>
				<template slot-scope="scope">{{ showAddress(scope.row[dataInfo.model]) }}</template>
			</el-table-column>
		</el-card>
	</div>
</template>
<script>
const URL = 'https://test-dealer.mamobility.com/dealer'
import { plugMixins, defultComputedMixin } from '../mixins'
export default {
	name: 'dic_cityStore',
	mixins: [plugMixins, defultComputedMixin],
	inject: ['formPage'],
	props: {
		valueCom: {},
		disabled: {
			type: Boolean,
			default: true
		},
		dataInfo: {
			type: Object,
			default: {}
		},
		searchType: {
			type: String,
			default: 'form'
		},
		edit: {},
		editNow: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			showBackFlag: false,
			loading: false,
			storeForm: {
				province: '',
				city: '',
				store: '',
				person: '',
				explain: ''
			},
			allcityList: {},
			provinceList: [],
			cityList: [],
			storeList: [],
			personList: []
		}
	},
	computed: {
		token() {
			return window.localStorage.getItem('Token')
		},
		isAdd() {
			if (this.searchType === 'form' && JSON.stringify(this.editNow) === '{}') {
				return true
			} else {
				return false
			}
		}
	},
	methods: {
		//列表时会先省市门店
		showAddress(value) {
			value = JSON.parse(value)
			let str = ''
			try {
				str =
					value.provinceText.pname +
					' - ' +
					value.cityText.cname +
					' - ' +
					value.storeText.shopName +
					' - ' +
					value.personText.userName
			} catch {
				console.log('回显地理数据出现问题')
			}
			return str
		},
		//发送请求封装
		dataApi(url, head, data) {
			return new Promise((resolve, reject) => {
				this.loading = true
				axios
					.post(`${URL}/${url}`, data, head)
					.then(res => {
						this.loading = false
						resolve(res)
					})
					.catch(error => {
						reject(error)
						this.loading = false
						console.log('出现错误##', error)
					})
			})
		},
		//   清空省
		clearInfo(type) {
			// type 0 省 1市 2 店 3 人
			switch (type) {
				case 0:
					storeForm.province = ''
					break
				case 1:
					storeForm.city = ''
					break
				case 2:
					storeForm.store = ''
					break
				case 3:
					storeForm.person = ''
					break
			}
		},
		//  计算出value的值
		Calculation() {
			//需要另外保存省市信息
			try {
				let text = {
					provinceText: this.CheckArr(
						this.provinceList,
						'pid',
						this.storeForm.province
					),
					cityText: this.CheckArr(this.cityList, 'cid', this.storeForm.city),
					storeText: this.CheckArr(
						this.storeList,
						'doorId',
						this.storeForm.store
					),
					personText: this.CheckArr(
						this.personList,
						'uId',
						this.storeForm.person
					)
				}
				this.info.value = JSON.stringify({
					...text,
					...this.storeForm
				})
			} catch {
				console.log('赋值info出错，环境可能为本地调试')
			}
		},
		CheckArr(arr, k, v) {
			for (let i = 0; i < arr.length; i++) {
				if (arr[i][k] === v) {
					return arr[i]
				}
			}
			return false
		},
		// 请求省市数据封装
		postData(call) {
			this.dataApi('development/dealer/getProvinceAndCity', {}, {}).then(
				res => {
					this.Handleprovince(res.data.data)
				}
			)
		},
		//获取门店
		getDoor() {
			console.log('city', this.storeForm.city)
			this.dataApi(
				'development/dealer/door',
				{ cid: this.storeForm.city },
				{}
			).then(res => {
				this.storeList = res.data.data
			})
		},
		//获取员工列表
		getStaff() {
			this.dataApi(
				'development/dealer/staff',
				{ doorId: this.storeForm.store },
				{}
			).then(res => {
				this.personList = res.data.data
			})
		},
		// 分拆省市
		Handleprovince(data) {
			// 遍历省数据，以获取信息
			data.forEach((v, i) => {
				this.provinceList.push({
					pname: v.pname,
					pid: v.pid
				})
				let bufferObj = {}
				bufferObj[v.pid] = []
				v.citys.forEach((v2, i2) => {
					bufferObj[v.pid].push({
						cname: v2.cname,
						cid: v2.cid
					})
				})
				Object.assign(this.allcityList, bufferObj)
			})
		},
		//处理数据回显
		HandleShowBack() {
			if (!this.info.value) {
				console.log('没有值,请求城市信息')
				this.postData()
				return false
			}
			let showbackVal
			try {
				showbackVal = JSON.parse(this.info.value)
			} catch {
				console.log('解析回显值失败')
				return
			}
			this.storeForm = showbackVal
			//获取在省市、门店、人员的数据
			this.showBackFlag = true
			Promise.all([
				this.dataApi('development/dealer/getProvinceAndCity', {}, {}),
				this.dataApi(
					'development/dealer/door',
					{ cid: this.storeForm.city },
					{}
				),
				this.dataApi(
					'development/dealer/staff',
					{ cid: this.storeForm.store },
					{}
				)
			])
				.then(res => {
					this.Handleprovince(res[0].data.data)
					this.storeList = res[1].data.data
					this.personList = res[2].data.data
					this.showBackFlag = false
				})
				.catch(error => {
					this.showBackFlag = false
					console.log(error)
				})
		}
	},
	watch: {
		//   监听省
		'storeForm.province': {
			handler(val) {
				if (!this.showBackFlag) {
					this.storeForm.city = ''
					this.Calculation()
					this.cityList = this.allcityList[val]
				}
			},
			deep: true
		},
		//  监听城市
		'storeForm.city': {
			handler(val) {
				if (!this.showBackFlag) {
					this.storeForm.store = ''
					this.Calculation()
					//变化了之后，需要请求出门店
					this.getDoor()
				}
			},
			deep: true
		},
		//  监听店
		'storeForm.store': {
			handler(val) {
				if (!this.showBackFlag) {
					this.storeForm.person = ''
					this.Calculation()
					this.getStaff()
				}
			},
			deep: true
		},
		//  监听人
		'storeForm.person': {
			handler(val) {
				this.Calculation()
			},
			deep: true
		}
	},
	mounted() {
		this.HandleShowBack()
	}
}
</script>
<style lang="less" scoped>
.dic_cityStore {
}
</style>