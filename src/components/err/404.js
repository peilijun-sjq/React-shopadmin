import React,{Component} from 'react';
import img404 from   '../../static/img/111.gif'
import {Link} from 'react-router-dom';
import {
     Button , //添加按钮
} from 'antd';
class Index extends Component
{
    render(){
        return(
            <div style={{overflow:'hidden'}}>
                <img src={img404} style={{display:'block',width:"800px",margin:'100px auto',}} alt=""/>
                <Link to='/admin'>
                    <Button type="primary" style={{display:'block',width:"100px",margin:'0 auto'}}>
                        回首页
                    </Button>
                </Link>
            </div>
        )
    }
}
export default Index
