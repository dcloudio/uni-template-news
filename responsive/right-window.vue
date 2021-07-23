<template>
	<view>
		<newDetail ref="detailPage"></newDetail>
	</view>
</template>

<script>
	import newDetail from '../pages/news/detail.nvue'
	export default {
		components:{
			newDetail
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		created(e) {
			//监听自定义事件，该事件由详情页列表的点击触发
			uni.$on('updateDetail', (e) => {
				// 执行 /pages/news/detail.nvue页面的load方法
				this.$refs.detailPage.load(e.detail);
			})
		}
	}
</script>

<style>
</style>
