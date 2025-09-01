
const { onMounted, ref, defineComponent } = Vue;

export default defineComponent({
    name: 'MapComp',
    template: `
        <div class="map-component">
            <div id="map-container" style="width:100%;height:400px;"></div>
        </div>
    `,
    setup() {
        //const address = ref('深圳市宝安区西乡街道固戍社区新湖路99号天健创新科技园2期3栋')

        onMounted(() => {
            // 创建地图实例
            const map = new BMap.Map("map-container");
            
            // // 公司坐标点（需要替换为实际坐标）
            // const point = new BMap.Point(12670472.00,2588048.00);
            
            // // 初始化地图，设置中心点坐标和地图级别
            // map.centerAndZoom(point, 17);
            
            // // 添加地图控件
            // map.addControl(new BMap.NavigationControl());
            // map.addControl(new BMap.ScaleControl());
            
            // // 创建标注
            // const marker = new BMap.Marker(point);
            // map.addOverlay(marker);
            
            // // 创建信息窗口
            // const infoWindow = new BMap.InfoWindow("深圳市西特新环保材料有限公司", {
            //     title: "公司位置",
            //     width: 250,
            //     height: 80
            // });
            
            // // 点击标注显示信息窗口
            // marker.addEventListener("click", function(){
            //     map.openInfoWindow(infoWindow, point);
            // });

                 
            map.centerAndZoom(new BMap.Point(12670472.00,2588048.00), 11);
            var local = new BMap.LocalSearch(map, {
                renderOptions:{map: map}
            });
            local.search("西特新环保材料有限公司");

        })

        // return {
        //     address
        // }
    }
});