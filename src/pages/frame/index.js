import React,{Component} from 'react';
import {
    Link
} from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon , Button} from 'antd';
import imgLogo from '../../static/img/logo.png';
import screenfull from 'screenfull'
//引导
import driverStep from '../utils/driver';
import Driver from 'driver.js' 
import 'driver.js/dist/driver.min.css'
let art= new Driver({  
    doneBtnText: '完成',              // Text on the final button
    closeBtnText: '关闭',            // Text on the close button for this step
    stageBackground: 'white',       // Background color for the staged behind highlighted element
    nextBtnText: '下一步',              // Next button text for this step
    prevBtnText: '上一步',          // Previous button text for this step
})
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
class Index extends Component
{   
    constructor(props){
        super(props)
        this.state={
            bread1:'Welcome',
            bread2:'',
            isFullscreen: false,
        }
    }
    componentDidMount(){
        if(!localStorage.getItem('token')){
            window.location.href='http://localhost:3000/login'
            return;
        }
        let bread1=sessionStorage.getItem('bread1')
        let bread2=sessionStorage.getItem('bread2')
        if(bread1&&bread2){
            this.setState({
                bread1,
                bread2
            })
        }
        
            art.defineSteps(driverStep)
            art.start()
            
        
    }
    enterIconLoading = () => {
    localStorage.removeItem('username')
    localStorage.removeItem('uid')
    localStorage.removeItem('token')
    window.location.reload()
    
    };
    render(){
        return(
            <Layout>
                <Header className="header" style={{padding:'0'}}>
                    <img src={imgLogo} alt='Logo' height='64'/>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px' ,display:'inline-block'}}
                >
                    {/* <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item> */}
                </Menu>
                <div style={{display:'inline-block',float:'right',marginRight:'10px'}} >
                <Icon type="fullscreen"   onClick={this.toggleFullscreen.bind(this)} style={{color:'#fff',fontSize:'20px',marginRight:'10px'}} />
                <span  style={{color:'#fff',marginRight:'5px'}} >您好!{localStorage.username}</span>
                        <Button
                            type="primary"
                            icon="poweroff"
                            onClick={this.enterIconLoading.bind(this)}
                            id="some-element4"
                            >
                            退出
                        </Button>
                </div>
                </Header>
                <Layout>
                <Sider width={200} style={{ background: '#fff' }} id="some-element1" >
                    <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    style={{ height: '100%', borderRight: 0 }}
                    >
                    <Menu.Item key="1" onClick={this.bread.bind(this,'a')}>
                
              <Link to="/admin"><Icon type="bank" />后台首页</Link>
            </Menu.Item>
                    <SubMenu
                        key="sub2"
                        title={
                        <span>
                            <Icon type="user" />
                            用户管理
                        </span>
                        }
                    >
                        <Menu.Item key="2" onClick={this.bread.bind(this,'b')}>
                        <Link to='/admin/users'>
                            用户列表
                        </Link>
                        </Menu.Item>
                    </SubMenu>
                   
                    <SubMenu
                        key="sub5"
                        title={
                        <span>
                            <Icon type="account-book" />
                            订单管理
                        </span>
                        }
                    >
                        <Menu.Item key="7" onClick={this.bread.bind(this,'g')}><Link to='/admin/orders'>订单列表</Link></Menu.Item>
                    </SubMenu>
                    
                    <SubMenu
                        key="sub4"
                        title={
                        <span>
                            <Icon type="shop" />
                            商品管理
                        </span>
                        }
                    >
                        <Menu.Item key="5" onClick={this.bread.bind(this,'e')}><Link to='/admin/goodslist'>商品列表</Link></Menu.Item>
                       
                    </SubMenu>
                    <SubMenu
                        key="sub3"
                        title={
                        <span>
                            <Icon type="unlock" />
                            权限管理
                        </span>
                        }
                    >
                        <Menu.Item key="3" onClick={this.bread.bind(this,'c')}><Link to='/admin/roles'>角色列表</Link></Menu.Item>
                        <Menu.Item key="4" onClick={this.bread.bind(this,'d')}><Link to='/admin/rights'>权限列表</Link></Menu.Item>
                    </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }} >
                    <Breadcrumb style={{ margin: '16px 0' }} id="some-element2" >
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>{this.state.bread1}</Breadcrumb.Item>
                    <Breadcrumb.Item>{this.state.bread2}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                     id="some-element3"
                    style={{
                        background: '#fff',
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                    >
                    {this.props.children}
                    </Content>
                </Layout>
                </Layout>
            </Layout>
        )
    }
    toggleFullscreen(){
        screenfull.toggle()
    }
    bread(option){
        switch(option){
            case 'a':
                this.setState({
                    bread1:'',
                    bread2:''
                })
                break;
            case 'b':
                this.setState({
                    bread1:'用户管理',
                    bread2:'用户列表'
                })
                break;
            case 'c':
                this.setState({
                    bread1:'权限管理',
                    bread2:'角色列表'
                })
                break;
            case 'd':
                this.setState({
                    bread1:'权限管理',
                    bread2:'权限列表'
                })
                break;
            case 'e':
                this.setState({
                    bread1:'商品管理',
                    bread2:'商品列表'
                })
                break;
            case 'f':
                this.setState({
                    bread1:'商品管理',
                    bread2:'商品分类'
                })
                break;
            case 'g':
                this.setState({
                    bread1:'订单管理',
                    bread2:'订单列表'
                })
                break;
            case 'h':
                this.setState({
                    bread1:'数据管理',
                    bread2:'数据统计'
                })
                break;
            default:
                break;
        }
        setTimeout(()=>{
            sessionStorage.setItem('bread1',this.state.bread1)
            sessionStorage.setItem('bread2',this.state.bread2)
        },500)
       
    }
}
export default Index
