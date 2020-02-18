<template>
	<div>
		<template v-if="searchType == 'form'">我是表单中的自定义组件</template>
		<template v-else-if="searchType == 'table'">我是子表中的自定义组件</template>
		<template v-else-if="searchType == 'searchType'">我是查询条件中的自定义组件</template>
		<el-table-column
			v-if="searchType == 'details'"
			:prop="dataInfo.model"
			:label="dataInfo.columnComment"
			:width="dataInfo.options.width===''?'auto':dataInfo.options.width"
		>
			<template>我是列表中的自定义组件</template>
		</el-table-column>
	</div>
</template>
<script>
export default {
	name: 'chzujian1',
	props: {
		dataInfo: {
			type: Object,
			default: {}
		},
		searchType: {
			type: String,
			default: 'form'
		}
	}
}
</script>