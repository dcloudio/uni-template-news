<template>
	<!-- TODO 在支付宝小程序下 需要用 style 覆盖标签的默认样式 -->
	<view class="media-item view" v-if="data.title" @click="click">
		<view class="view" :style="{flexDirection: (data.article_type === 1 || data.article_type === 2)?(data.article_type === 2 ?'row':'row-reverse'):'column' }">
			<text class="media-title" :class="{'media-title2': data.article_type === 1 || data.article_type === 2}">{{data.title}}</text>
			<view v-if="data.image_list || data.image_url" class="image-section flex-row" :class="{'image-section-right': data.article_type === 2, 'image-section-left': data.article_type === 1}"
			 :style="{flexDirection: 'row' }">
				<image class="image-list1" :class="{'image-list2': data.article_type === 1 || data.article_type === 2}" v-if="data.image_url"
				 :src="data.image_url"></image>
				<image class="image-list3" v-if="data.image_list" :src="source.url" v-for="(source, i) in data.image_list"
				 :key="i" />
			</view>
		</view>
		<view class="media-foot flex-row" style="flex-direction: row;">
			<view class="media-info flex-row" style="flex-direction: row;">
				<text class="info-text">{{data.source}}</text>
				<text class="info-text">{{data.comment_count}}条评论</text>
				<text class="info-text">{{data.datetime}}</text>
			</view>
			<view class="close-view" @click.stop="close">
				<view class="close-l close-h"></view>
				<view class="close-l close-v"></view>
			</view>
		</view>
		<view class="media-item-line" style="position: absolute;"></view>
	</view>
</template>

<script>
	export default {
		props: {
			data: {
				type: Object,
				default: function(e) {
					return {}
				}
			}
		},
		methods: {
			click() {
				this.$emit('click');
			},
			close(e) {
				e.stopPropagation();
				this.$emit('close');
			}
		}
	}
</script>

<style>
	.view {
		flex-direction: column;
	}

	.flex-row {
		flex-direction: row;
	}

	.flex-col {
		flex-direction: column;
	}

	.list-cell {
		padding: 0 30upx;
	}

	.uni-list-cell-hover {
		background-color: #eeeeee;
	}

	.media-item {
		position: relative;
		flex: 1;
		flex-direction: column;
		padding: 20upx 30upx 21upx 30upx;
	}

	.media-item-line {
		position: absolute;
		left: 30upx;
		right: 30upx;
		bottom: 0;
		height: 1upx;
		background-color: #ebebeb;
	}

	.media-image-right {
		flex-direction: row;
	}

	.media-image-left {
		flex-direction: row-reverse;
	}

	.media-title {
		flex: 1;
	}

	.media-title {
		lines: 3;
		text-overflow: ellipsis;
		font-size: 30upx;
		color: #555555;
	}

	.media-title2 {
		flex: 1;
		margin-top: 6upx;
		line-height: 40upx;
	}

	.image-section {
		margin-top: 20upx;
		flex-direction: row;
		justify-content: space-between;
	}

	.image-section-right {
		margin-top: 0upx;
		margin-left: 10upx;
		width: 225upx;
		height: 146upx;
	}

	.image-section-left {
		margin-top: 0upx;
		margin-right: 10upx;
		width: 225upx;
		height: 146upx;
	}

	.image-list1 {
		width: 690upx;
		height: 481upx;
	}

	.image-list2 {
		width: 225upx;
		height: 146upx;
	}

	.image-list3 {
		width: 225upx;
		height: 146upx;
	}

	.media-info {
		flex-direction: row;
		align-items: center;
	}

	.info-text {
		margin-right: 20upx;
		color: #999999;
		font-size: 24upx;
	}

	.media-foot {
		margin-top: 25upx;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.close-view {
		position: relative;
		align-items: center;
		flex-direction: row;
		width: 40upx;
		height: 30upx;
		line-height: 30upx;
		border-width: 1upx;
		border-style: solid;
		border-color: #aaaaaa;
		border-radius: 4px;
		justify-content: center;
		text-align: center;
	}

	.close-l {
		position: absolute;
		width: 18upx;
		height: 1upx;
		background-color: #aaaaaa;
	}

	.close-h {
		transform: rotate(45deg);
	}

	.close-v {
		transform: rotate(-45deg);
	}
</style>
