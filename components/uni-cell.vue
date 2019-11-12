<template>
    <!-- #ifdef APP-NVUE -->
    <cell>
        <slot />
    </cell>
    <!-- #endif -->
    <!-- #ifndef APP-NVUE -->
    <view>
        <slot />
    </view>
    <!-- #endif -->
</template>

<script>
    export default {
        name: 'UniCell',
        props: {}
    }
</script>
