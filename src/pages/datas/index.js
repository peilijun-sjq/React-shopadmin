import React,{Component} from 'react';
import { Card} from 'antd';
import {DashStyle} from './style';
import {getDataList} from '../../api'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/line';
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class Index extends Component
{
    render(){
        return(
            <div>
                <Card title="概况">
                <DashStyle>
                <div id="div">
                    <div className="div1">华东<br/>一周总销量<p>23303</p></div>
                    <div className="div2">华南<br/>一周总销量<p>31190</p></div>
                    <div className="div3">华北<br/>一周总销量<p>58131</p></div>
                    <div className="div4">西部<br/>一周总销量<p>61927</p></div>
                    <div className="div5">其他<br/>一周总销量<p>76147</p></div>
                </div>
                </DashStyle>
                <hr />
                <div id="main" style={{ width: '90%', height: 400 }}></div>
                <hr />
                <div id="echarts2" style={{width: '90%',height:400}}></div>
                </Card>
            </div>
        )
    }
    componentDidMount(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        getDataList(1)
        .then(res=>{
            myChart.setOption(res.data)
             // 绘制图表
        myChart.setOption({
            title: {
                text: "周销售情况"
            },
            
            tooltip: {
                trigger: "axis",
                axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
            },
            grid: {
                left: "3%",
                right: "4%", 
                bottom: "3%",
                containLabel: true
            },
            toolbox: {
                feature: { 
                saveAsImage: {}
                }
            },
        });
        });
        let myChart2 = echarts.init(document.getElementById("echarts2"));
        // 绘制图表
        myChart2.setOption({
          title: {
            text: "月销售情况"
          },
          tooltip1: {
            trigger: "axis"
          },
          legend: {data:["华东", "华南", "华北", "西部", "其他"]},
          tooltip: {
                trigger: "axis",
                axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
          },
          toolbox: {
            feature: { 
              saveAsImage: {}
            }
          },
    dataset: {
        source: [
            ['product', '2017-12-1', '2017-12-2', '2017-12-3', '2017-12-4', '2017-12-5', 
                        '2017-12-6', '2017-12-7', '2017-12-8', '2017-12-9', '2017-12-10', 
                       '2017-12-11', '2017-12-12', '2017-12-13', '2017-12-14', '2017-12-15',
                         '2017-12-16', '2017-12-17', '2017-12-18', '2017-12-19', '2017-12-20',
                         '2017-12-21', '2017-12-22', '2017-12-23', '2017-12-24', '2017-12-25',
                         '2017-12-26', '2017-12-27', '2017-12-28', '2017-12-29'],

            ['首页', 2860,3786,2028,1913,3206,2750,2606,2429,1051,1769,1641,3668,3586,3919,2627,2780,3370,1571,1910,2108,1421,1439,3412,2619,2455,2440,2391,2001,2311],
            ['分类', 3111,1304,3429,2510,1445,1601,3110,1172,3190,1269,1263,1818,1498,2360,1719,2917,1813,1011,1891,1811,1904,2636,3880,3697,3165,3468,1232,2401,3941],
            ['商品列表', 2975,3163,1061,2812,2610,1755,3731,3574,2800,3041,3396,3087,1733,2045,2713,2244,3953,2342,2724,1730,1258,1862,2166,3630,1458,3022,1232,2410,4312],
            ['商品详情', 1542,1903,3019,2528,1716,2974,2324,1354,3431,1396,3191,2980,3174,2144,1412,1472,1328,1679,3949,2220,2576,3401,1187,3060,2799,3704,1231,4512,1231],
        ]
          },
          xAxis: [
              {type: 'category', gridIndex: 0}
          ],
          yAxis: [
              {gridIndex: 0}
          ],
          grid: [
              {bottom: '20%'},
              {top: '20%'}
          ],
          series: [
              {type: 'bar', seriesLayoutBy: 'row'},
              {type: 'bar', seriesLayoutBy: 'row'},
              {type: 'bar', seriesLayoutBy: 'row'},
              {type: 'bar', seriesLayoutBy: 'row'},
          ]
        });
    }
}
export default Index
