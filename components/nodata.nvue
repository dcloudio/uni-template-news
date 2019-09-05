<template>
	<view class="nodata">
		<view class="nodata-content">
			<view class="text-view a-i-c j-c-c t-a-c">
				<text class="title">{{textTypes[networkType]}}</text>
			</view>
			<view class="icon-view"></view>
			<view class="opera-view">
				<view class="btn btn-default" v-if="networkType!='none'" @click="retry">
					<text class="btn-text">重试</text>
				</view>
				<view class="btn btn-default" v-if="networkType=='none'" @click="openSettings">
					<text class="btn-text">设置</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'nodata',
		data() {
			return {
				textTypes: {
					none: "暂无网络"
				},
				isConnected: false,
				networkType: "none"
			}
		},
		mounted() {
			this.isIOS = (uni.getSystemInfoSync().platform === 'ios');
			uni.onNetworkStatusChange((res) => {
				this.isConnected = res.isConnected;
				this.networkType = res.networkType;
				console.log(this.isConnected);
				console.log(this.networkType);
			});
			uni.getNetworkType({
				success: (res) => {
					this.networkType = res.networkType;
				}
			});
		},
		methods: {
			retry() {
				this.$emit('retry');
			},
			async openSettings() {
				if (this.networkType == "none") {
					this.openSystemSettings();
					return;
				}
			},
			openAppSettings() {
				this.gotoAppSetting();
			},
			openSystemSettings() {
				if (this.isIOS) {
					this.gotoiOSSetting();
				} else {
					this.gotoAndroidSetting();
				}
			},
			network() {
				var result = null;
				var cellularData = plus.ios.newObject("CTCellularData");
				var state = cellularData.plusGetAttribute("restrictedState");
				if (state == 0) {
					result = null;
					console.log("StateUnknown");
				} else if (state == 2) {
					result = 1;
					console.log("已经开启了互联网权限:NotRestricted");
				} else if (state == 1) {
					result = 2;
					console.log("Restricted");
				}
				plus.ios.deleteObject(cellularData);
				return result;
			},
			gotoAppSetting() {
				if (this.isIOS) {
					var UIApplication = plus.ios.import("UIApplication");
					var application2 = UIApplication.sharedApplication();
					var NSURL2 = plus.ios.import("NSURL");
					var setting2 = NSURL2.URLWithString("app-settings:");
					application2.openURL(setting2);
					plus.ios.deleteObject(setting2);
					plus.ios.deleteObject(NSURL2);
					plus.ios.deleteObject(application2);
				} else {
					var Intent = plus.android.importClass("android.content.Intent");
					var Settings = plus.android.importClass("android.provider.Settings");
					var Uri = plus.android.importClass("android.net.Uri");
					var mainActivity = plus.android.runtimeMainActivity();
					var intent = new Intent();
					intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
					var uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
					intent.setData(uri);
					mainActivity.startActivity(intent);
				}
			},
			gotoiOSSetting() {
				var UIApplication = plus.ios.import("UIApplication");
				var application2 = UIApplication.sharedApplication();
				var NSURL2 = plus.ios.import("NSURL");
				var setting2 = NSURL2.URLWithString("App-prefs:root=General");
				application2.openURL(setting2);
				plus.ios.deleteObject(setting2);
				plus.ios.deleteObject(NSURL2);
				plus.ios.deleteObject(application2);
			},
			gotoAndroidSetting() {
				var Intent = plus.android.importClass("android.content.Intent");
				var Settings = plus.android.importClass("android.provider.Settings");
				var mainActivity = plus.android.runtimeMainActivity();
				var intent = new Intent(Settings.ACTION_SETTINGS);
				mainActivity.startActivity(intent);
			}
		}
	}
</script>

<style>
	.a-i-c {
		align-items: center;
	}

	.j-c-c {
		justify-content: center;
	}

	.t-a-c {
		text-align: center;
	}

	.nodata {
		flex: 1;
		flex-direction: column;
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		align-items: center;
		justify-content: center;
		padding: 30px;
		background-color: #f8f8f8;
	}

	.nodata-content {
		transform: translateY(-50px);
	}

	.text-view {
		margin-bottom: 40px;
	}

	.title {
		color: #999999;
		font-size: 18px;
	}

	.opera-view {
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.btn {
		padding: 5px 10px;
		width: 128px;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.btn-text {
		color: #999999;
		font-size: 15px;
	}

	.btn-default {
		border-color: #999999;
		border-style: solid;
		border-width: 1px;
		border-radius: 3px;
	}
</style>
