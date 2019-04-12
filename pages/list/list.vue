<template>
	<view class="uni-tab-bar">
		<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view v-for="(tab, index) in tabBars" :key="tab.ref" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']"
			 :id="tab.ref" :data-current="index" @click="tapTab(index)">{{tab.name}}</view>
		</scroll-view>
		<!-- #ifndef MP-BAIDU -->
		<scroll-view class="list" v-for="(tabItem, idx) in newsList" :key="tabItem.id" v-if="tabIndex === idx" scroll-y
		 @scrolltolower="loadMore(idx)">
			<block v-for="(newsItem, newsIndex) in tabItem.data" :key="newsItem.id">
				<uni-media-list :options="newsItem" @close="dislike(idx, newsIndex)" @click="goDetail(newsItem)"></uni-media-list>
			</block>
			<view class="uni-tab-bar-loading">
				<view class="loading-more">{{loadingText}}</view>
			</view>
		</scroll-view>
		<!-- #endif -->
		<!-- #ifdef MP-BAIDU -->
		<view class="scroll-wrap" v-for="(tabItem, idx) in newsList" :key="idx">
			<scroll-view class="list" v-if="tabIndex === idx" scroll-y @scrolltolower="loadMore(idx)" :style="scrollViewHeight">
				<block v-for="(newsItem, newsIndex) in tabItem.data" :key="newsIndex">
					<uni-media-list :options="newsItem" @close="dislike(idx, newsIndex)" @click="goDetail(newsItem)"></uni-media-list>
				</block>
				<view class="uni-tab-bar-loading">
					<view class="loading-more">{{loadingText}}</view>
				</view>
			</scroll-view>
		</view>
		<!-- #endif -->
	</view>
</template>
<script>
	import uniMediaList from '@/components/uni-media-list/uni-media-list.vue';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';

	import {
		friendlyDate
	} from '@/common/util.js';

	export default {
		components: {
			uniMediaList,
			uniLoadMore
		},
		data() {
			return {
				loadingText: {
					contentdown: '上拉加载更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				scrollLeft: 0,
				refreshing: false,
				refreshText: '下拉可以刷新',
				newsList: [],
				tabIndex: 0,
				tabBars: [{
					name: '最新',
					id: 0,
					ref: 'new'
				}, {
					name: '大公司',
					id: 23,
					ref: 'company'
				}, {
					name: '内容',
					id: 223,
					ref: 'content'
				}, {
					name: '消费',
					id: 221,
					ref: 'xiaofei'
				}, {
					name: '娱乐',
					id: 225,
					ref: 'yule'
				}, {
					name: '区块链',
					id: 208,
					ref: 'qukuailian'
				}, ]
			}
		},
		computed: {
			scrollViewHeight() {
				return 'height:' + (uni.getSystemInfoSync().windowHeight) + 'px';
			}
		},
		onLoad: function() {
			// 初始化列表信息
			this.tabBars.forEach((tabBar, index) => {
				this.newsList.push({
					id: 'tabBar' + index,
					data: [],
					requestParams: {
						columnId: tabBar.id,
						minId: 0,
						pageSize: 10,
						column: 'id,post_id,title,author_name,cover,published_at,comments_count'
					},
					loadingText: '加载中...'
				});
			});
			this.getList();
		},
		methods: {
			getList(action = 1) {
				let activeTab = this.newsList[this.tabIndex];
				activeTab.requestParams.time = new Date().getTime() + '';
				if (action === 1) {
					activeTab.requestParams.minId = 0;
				}
				this.loadingText = '加载中...';
				uni.request({
					url: 'https://unidemo.dcloud.net.cn/api/news',
					data: activeTab.requestParams,
					success: (result) => {
						if (result.statusCode == 200) {
							const data = result.data.map((news) => {
								return {
									id: news.id,
									article_type: 1,
									datetime: friendlyDate(new Date(news.published_at.replace(/\-/g, '/')).getTime()),
									title: news.title,
									image_url: news.cover,
									source: news.author_name,
									comment_count: news.comments_count,
									post_id: news.post_id
								};
							});
							if (action === 1) {
								activeTab.data = data;
								this.refreshing = false;
							} else {
								data.forEach((news) => {
									activeTab.data.push(news);
								});
							}
							activeTab.requestParams.minId = data[data.length - 1].id;
						}
					}
				});
			},
			goDetail(detail) {
				uni.navigateTo({
					url: '/pages/detail/detail?query=' + encodeURIComponent(JSON.stringify(detail))
				});
			},
			dislike(tabIndex, newsIndex) {
				uni.showModal({
					content: '不感兴趣？',
					success: (res) => {
						if (res.confirm) {
							this.newsList[tabIndex].data.splice(newsIndex, 1);
						}
					}
				})
			},
			loadMore() {
				this.getList(2);
			},
			async changeTab(event) {
				let index = event.detail.current;
				if (this.isClickChange) {
					this.tabIndex = index;
					this.isClickChange = false;
					return;
				}
				let tabBar = await this.getElSize('tab-bar');
				let tabBarScrollLeft = tabBar.scrollLeft;
				let width = 0;

				for (let i = 0; i < index; i++) {
					let result = await this.getElSize(this.tabBars[i].ref);
					width += result.width;
				}
				let winWidth = uni.getSystemInfoSync().windowWidth,
					nowElement = await this.getElSize(this.tabBars[index].ref),
					nowWidth = nowElement.width;
				if (width + nowWidth - tabBarScrollLeft > winWidth) {
					this.scrollLeft = width + nowWidth - winWidth;
				}
				if (width < tabBarScrollLeft) {
					this.scrollLeft = width;
				}
				this.isClickChange = false;
				this.tabIndex = index;

				// 首次切换后加载数据
				const activeTab = this.newsList[this.tabIndex];
				if (activeTab.data.length === 0) {
					this.getList();
				}
			},
			getNodeSize(node) {
				return new Promise((resolve, reject) => {
					dom.getComponentRect(node, (result) => {
						resolve(result.size);
					});
				});
			},
			onRefresh(event) {
				this.refreshText = '正在刷新...';
				this.refreshing = true;
				this.getList();
			},
			getElSize(id) { //得到元素的size
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select('#' + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				});
			},
			async tapTab(index) { //点击tab-bar
				if (this.tabIndex === index) {
					return false;
				} else {
					this.tabIndex = index;
					// 首次切换后加载数据
					const activeTab = this.newsList[this.tabIndex];
					if (activeTab.data.length === 0) {
						this.getList();
					}
				}
			}
		}
	}
</script>
<style>
	page {
		background-color: #FFFFFF;
		height: 100%;
		font-size: 11px;
		line-height: 1.8;
	}

	.uni-tab-bar {
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		height: 100%;
	}

	.uni-tab-bar .list {
		width: 750upx;
		height: calc(100% - 100upx);
		margin-top: 100upx;
	}

	.uni-swiper-tab {
		width: 100%;
		white-space: nowrap;
		line-height: 100upx;
		height: 100upx;
		border-bottom: 1px solid #c8c7cc;
		position: fixed;
		background: #FFFFFF;
		z-index: 999;
		top: var(--window-top);
		left: 0;
	}

	.swiper-tab-list {
		font-size: 30upx;
		width: 150upx;
		display: inline-block;
		text-align: center;
		color: #555;
	}

	.uni-tab-bar .active {
		color: #007AFF;
	}

	.uni-tab-bar .swiper-box {
		flex: 1;
		width: 100%;
		height: calc(100% - 100upx);
		overflow: scroll;
	}

	.uni-tab-bar-loading {
		text-align: center;
		padding: 20upx 0;
		font-size: 14px;
		color: #CCCCCC;
	}
</style>
