import React,{Component} from 'react';
import {Card,Button} from 'antd';
class Index extends Component {
    render(){
        return(
            <Card  title="新手引导" extra={<Button type="dashed">Welcome</Button>}>
                <p>引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于 driver.js.</p>
                <Button type="primary" onClick={this.a.bind(this)}>打开引导文档</Button>
            </Card>
        )
    }
    a(){
        localStorage.removeItem('a')
        window.location.reload()
    }
    
}

export default Index
