<template>
    <div id='Clock'>
        <div id="toolbar"></div>
    </div>
</template>

<script>
    import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute, useRouter } from 'vue-router';
    import * as Cesium from 'cesium';
    import { Viewer } from 'cesium';
    export default {
        name: 'Clock',
        components: {},
        props: {},
        setup(props, context) {
            const store = useStore();
            const route = useRoute();
            const router = useRouter();
            const data = reactive({})
            onBeforeMount(() => {
            })
            onMounted(() => {
                // Create a clock that loops on Christmas day 2013 and runs in 4000x real time.
                const clock = new Cesium.Clock({
                    startTime: Cesium.JulianDate.fromIso8601("2013-12-25"),
                    currentTime: Cesium.JulianDate.fromIso8601("2013-12-25"),
                    stopTime: Cesium.JulianDate.fromIso8601("2013-12-26"),
                    clockRange: Cesium.ClockRange.LOOP_STOP, // loop when we hit the end time
                    clockStep: Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER,
                    multiplier: 1, // how much time to advance each tick
                    shouldAnimate: true, // Animation on by default
                });

                const viewer = new Cesium.Viewer("Clock", {
                    clockViewModel: new Cesium.ClockViewModel(clock),
                });

                viewer.scene.globe.enableLighting = true;

                Sandcastle.addToolbarButton("Reset Current Time", function () {

                    const resetTime = viewer.clockViewModel.startTime;
                    viewer.clockViewModel.currentTime = resetTime;
                    viewer.timeline.updateFromClock();
                });

                Sandcastle.addToolbarButton("Slow Down Clock", function () {

                    viewer.clockViewModel.multiplier /= 20;
                });

                Sandcastle.addToolbarButton("Speed Up Clock", function () {

                    viewer.clockViewModel.multiplier *= 20;
                });
            })
            watchEffect(() => {
            })
            return {}
        }
    }
</script>
<style scoped lang='less'>
</style>