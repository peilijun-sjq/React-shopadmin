import React,{Component} from 'react';
import imgLogo from '../../static/img/500.png';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

// import creatHistory from 'history/createHashHistory'  //返回上一页这段代码
// const history = creatHistory();//返回上一页这段代码

class Index extends Component
{

    // goBackPage = () => {
    //     history.goBack();  //返回上一页这段代码
    // }
    render(){
        return(
            <div style={{textAlign:"center",marginTop:"80px"}}>
                 <img src={imgLogo} alt='Logo' width="50%"/>
                 <h1>
                     <Link to="/admin">
                     <Button type="primary">回到首页</Button>
                     &nbsp;&nbsp;
                     <Button type="primary" onClick={this.goBackPage} className="goBack"> 返回上一页 </Button>
                     </Link>
                
                 </h1>
                 

            </div>
        )
    }
}
export default Index
