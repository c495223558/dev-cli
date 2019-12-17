<template>
	<div class="reduction_radio">
		<div>
			<!--隐藏框-->
			<div v-show="show_one" class="show-one-box">
				<div class="show-one-title">
					请选择申请减免/减缴的项目（可以多选）
				</div>
				<div class="show-one-list">
					<!--:class="item.select==1?'red':''"-->
					<div v-for="(item,index) in list" :key="index" class="show-one-item">
						<div @click="clickItem(item,index)" class="show-one-text">
							{{item.policyReliefName}}
						</div>
						<img v-show="item.select==1" class="select-img" src="../assets/images/reduction_radio/select.png" />
					</div>
				</div>
			</div>
			<!--模态框开始-->
			<el-dialog title="请上传所有证件，其中规划证请在5个工作日内提交原件至窗口" :visible.sync="model" width="70%" :showClose="show_close" :closeOnPressEscape="show_close" :closeOnClickModal="show_close" :center="center">
				<div class="upload-btn" v-for="(item,index) in list[this.father_index].child" :key="index">
					<el-upload @click.native="clickImgBtn(item,index)" class="upload-demo" :on-preview="handlePictureCardPreview" :before-upload="fileUploadBefore" :action="action" :on-progress='progress' :on-success="handleAvatarSuccess" :on-remove="handleRemove" :file-list="item.fileList" list-type="picture-card" accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PBG">
						<el-button size="small" type="primary">{{item.policyReliefItemName}}</el-button>
					</el-upload>
					<el-dialog :modal="append" :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				</div>
				<span slot="footer" class="dialog-footer">
			    <el-button type="primary" @click="confirm" :disabled="confirm_disabled">确 认</el-button>
			    <el-button type="primary" @click="cancel">取消申请</el-button>
			  </span>
			</el-dialog>
			<!--模态框结束-->
		</div>
	</div>
</template>
<script>
	export default {
		name: 'reduction_radio',
		props: {
			inject: ['parentPage', 'formPage'],
			// 主子表的值
			valueCom: {},
			dataInfo: {
				type: Object,
				default: {}
			},
			disabled: {
				type: Boolean,
				default: true
			},
			searchType: {
				type: String,
				default: "form"
			},
			poolDate: {},
			editand: {},
			edit: {},
			editNow: {
				type: Object,
				default: () => {}
			},
		},
		data() {
			return {
				boshi: 'http://118.31.117.243/support', //博士的测试地址
				token: '', //local中的token
				base_url: '', //全局域名
				center: true, //模态框的内容居中显示
				show_close: false, //隐藏右上角的关闭按钮
				append: false, //遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Dialog 的父元素上
				dialogImageUrl: '', //当前预览的图片路径
				dialogVisible: false, //控制预览是否显示
				confirm_disabled: false, //控制确认按钮的状态
				father_index: 0, //记录当前点的哪个--big
				child_index: 0, //记录当前点的哪个 --small
				model: false, //模态框的状态
				radio: 0, //控制单选选中
				show_one: true, //控制显示下边的隐藏框
				//fileList: [],
				//action: 'https://test-dsp.mamcharge.com/api/web/icon/upload',//正式上传地址
				//action: 'http://118.31.117.243/api/web/icon/upload', //测试上传地址
				action: window.MainHeader + '/web/icon/upload', //测试上传地址
				list: [{
					policyReliefName: '棚户区改造安置住房是肯定就是打开手机打开手机打开手机的',
					select: 0,
					child: [{
						policyReliefItemName: '上传房产证000',
						url: '',
						fileList: []
					}, {
						policyReliefItemName: '上传土地证0',
						url: '',
						fileList: []
					}, {
						policyReliefItemName: '上传规划证0',
						url: '',
						fileList: []
					}],
				}, {
					policyReliefName: '保障性住房',
					select: 0,
					child: [{
						policyReliefItemName: '上传房产证1',
						url: '',
						fileList: []
					}, {
						policyReliefItemName: '上传土地证1',
						url: '',
						fileList: []
					}, {
						policyReliefItemName: '上传规划证1',
						url: '',
						fileList: []
					}],
				}, {
					policyReliefName: '人民防空建设项目',
					select: 0,
					child: [{
						policyReliefItemName: '上传房产证',
						url: '',
						fileList: []
					}, {
						policyReliefItemName: '上传土地证',
						url: '',
						fileList: []
					}, {
						policyReliefItemName: '上传规划证',
						url: '',
						fileList: []
					}],
				}, {
					policyReliefName: '养老服务机构',
					select: 0,
					child: [{
						policyReliefItemName: '上传房产证',
						url: '',
						fileList: []
					}, {
						policyReliefItemName: '上传土地证',
						url: '',
						fileList: []
					}, {
						policyReliefItemName: '上传规划证',
						url: '',
						fileList: []
					}],
				}, {
					policyReliefName: '军队后勤保障社会化改造项目',
					select: 0,
					child: [{
						policyReliefItemName: '上传房产证',
						url: '',
						fileList: []
					}, {
						policyReliefItemName: '上传土地证',
						url: '',
						fileList: []
					}, {
						policyReliefItemName: '上传规划证',
						url: '',
						fileList: []
					}],
				}, {
					policyReliefName: '公共交通基础设施',
					select: 0,
					child: [{
						policyReliefItemName: '上传房产证',
						url: '',
						fileList: []
					}, {
						policyReliefItemName: '上传土地证',
						url: '',
						fileList: []
					}, {
						policyReliefItemName: '上传规划证',
						url: '',
						fileList: []
					}],
				}, {
					policyReliefName: '驻济教学设施',
					select: 0,
					child: [{
						policyReliefItemName: '上传房产证',
						url: '',
						fileList: []
					}, {
						policyReliefItemName: '上传土地证',
						url: '',
						fileList: []
					}, {
						policyReliefItemName: '上传规划证',
						url: '',
						fileList: []
					}],
				}, ],
				child_list: [],
				new_list: []
			};
		},
		watch: {
			list: {
				handler: function(newval, oldval) {
					var new_data = JSON.stringify(newval)
					this.dataInfo.value = new_data
					//console.log('监听数组变化：', this.dataInfo.value)
				},
				deep: true
			}
		},
		mounted() {

			this.token = localStorage.getItem('Token')
			this.base_url = window.MainHeader
			console.log('啊啊啊啊啊啊啊啊啊啊啊')
			console.log('token是什么1：', this.token)
			console.log('window.MainHeader:', this.base_url)
			console.log('首次：', this.dataInfo)
			if(this.dataInfo.value !== "") {
				var new_list = JSON.parse(this.dataInfo.value)
				this.list = new_list
				console.log('第一个看有没有数据：', this.list)
			} else {
				this.updata()
			}

		},
		methods: {
			// 第一次请求数据  看s3里边有没有数据
			//进来获取数据
			updata() {
				axios
					.post(
						`${this.boshi}/api/thrid/policyRelief/list/type`, {
							tableId: ''
						}, {
							headers: {
								token: this.token
							}
						}
					)
					.then(res => {
						console.log('请求之后res是啥：', res)
						this.list = res.data.data
						console.log('第二个this.lits是啥', this.list)
					})
					.catch(error => {
						console.log('单选错误了：', error);
					});
			},
			//点击确认
			confirm() {
				console.log('点击确认之后父级：', this.list);
				console.log('点击确认之后子级：', this.child_list);
				console.log('AA', this.list[this.father_index])
				for(var i = 0; i < this.list[this.father_index].child.length; i++) {
					if(this.list[this.father_index].child[i].url == '') {
						this.$message({
							message: '请全部选择才能提交',
							type: 'warning'
						});
						return false
					}
				}

				this.list[this.father_index].select = 1
				this.model = false
			},
			//取消申请
			cancel() {
				for(var i = 0; i < this.list[this.father_index].child.length; i++) {
					this.list[this.father_index].child[i].url = ''
					this.list[this.father_index].child[i].fileList = []
				}
				this.model = false
				this.list[this.father_index].select = 0
				console.log('主list', this.list)
			},
			//点击item
			clickItem(item, index) {
				this.child_list = item.child
				this.father_index = index
				setTimeout(() => {
					this.model = true
				}, 300)
			},
			// 点击上传图片的按钮
			clickImgBtn(item, index) {
				this.child_index = index
				console.log('zzz', this.child_index)

			},
			//选择申请减免还是不申请减免
			selectRadio(val) {
				console.log('当前选择的', val)
				console.log('数据里边的', this.radio)
			},
			upload() {

			},
			//移除之后的函数
			handleRemove(file, fileList) {
				console.log('file', file);
				console.log('fileList', fileList);
				//file.uid
				for(var i = 0; i < this.list[this.father_index].child.length; i++) {
					if(this.list[this.father_index].child[i].uid == file.uid) {
						console.log('第几个:', i)
						this.list[this.father_index].child[i].url = ''
					}
				}
				console.log('删除之后的list:', this.list)
			},
			//上传成功之后的函数
			handleAvatarSuccess(res, file) {
				var imageUrl = URL.createObjectURL(file.raw);
				console.log('之后', imageUrl)
				console.log('上传成功之后的res', res)
				//this.child_list[this.child_index].url = res.data.iconUrl
				this.list[this.father_index].child[this.child_index].url = res.data.iconUrl

				//回显
				this.list[this.father_index].child[this.child_index].fileList[0].url = res.data.iconUrl
				console.log('回显：', this.list[this.father_index].child[this.child_index].fileList)
				//this.list[this.father_index].child[this.child_index].fileList.name = res.data.iconName
				//this.list[this.father_index].child[this.child_index].fileList.url = res.data.iconUrl
			},
			// 文件上传之前
			fileUploadBefore(file) {
				console.log('传之前是啥1：', this.list[this.father_index].child[this.child_index])
				//this.child_list[this.child_index].url
				if(this.list[this.father_index].child[this.child_index].url !== "") {
					this.$message({
						type: 'warning',
						message: '只能上传一份文件，请先删除上传的文件重新上传。'
					})
					return false
				}
				console.log('文件：', file)
				if(file.size > 5607200) {
					this.$message({
						type: 'warning',
						message: '请选择5M以内的文件'
					})
					return false
				}

			},
			// 预览
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			progress(vent, file, fileList) {
				console.log('vent1', vent)
				console.log('11111111111111111111113')
				console.log('file1', file)
				console.log('fileList1', fileList)
				console.log('啊呀呀呀：', file.response)

				//this.list[this.child_index].fileList = fileList
				this.list[this.father_index].child[this.child_index].fileList = fileList

				this.list[this.father_index].child[this.child_index].uid = file.uid

				console.log('附件上传之后：', this.list[this.father_index].child[this.child_index].fileList)
			},
		}
	}
</script>
<style lang="less">
	.show-one-box {
		box-sizing: border-box;
		width: 100%;
		height: auto;
		border: 1px solid #000;
		margin-top: 10px;
	}
	
	.show-one-title {
		width: 100%;
		box-sizing: border-box;
		padding: 10px;
		text-align: center;
		border-bottom: 1px solid #000;
	}
	
	.show-one-list {
		width: 100%;
		box-sizing: border-box;
		padding-bottom: 20px;
		overflow: auto;
	}
	
	.show-one-item {
		width: 18%;
		/*width: 200px;*/
		height: 80px;
		box-sizing: border-box;
		border: 1px solid #000;
		padding: 0 10px;
		float: left;
		margin: 20px 0 0 20px;
		/*text-align: center;*/
		/*position: relative;*/
		display: table;
	}
	
	.show-one-text {
		text-align: center;
		/*background: green;*/
		display: table-cell;
		vertical-align: middle;
	}
	
	.select-img {
		width: 60px;
		height: 40px;
		position: absolute;
		bottom: -10px;
		right: -20px;
	}
	
	.upload-btn {
		margin-top: 10px;
	}
	
	.red {
		border-color: #f00;
	}
	
	.upload-btn .el-upload--picture-card {
		width: auto !important;
		padding: 0 20px;
	}
</style>