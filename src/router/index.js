// 导入库
import React,{Component} from 'react';
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
//导入高阶组件
import PrivateRouter from './privateRoute'
// 导入组件
import Login from '../pages/login/index';
import Frame from '../pages/frame/index';
import Admin from '../pages/admin/index';
import Articles from '../pages/articles/index';
import Users from '../pages/users';
import Right from '../pages/rights/right/index';
import Role from '../pages/rights/role/index';
import RoleEd from '../pages/rights/role/editor';
import Tree from '../pages/rights/role/tree';
import GoodsCate from '../pages/goods/goodsCate/index';
import Addcate from '../pages/goods/goodsCate/addCate';
import GoodList from '../pages/goods/goodslist/index';
import AddGoods from '../pages/goods/goodslist/addGoods';
import Orders from '../pages/orders/index';
import Aatas from '../pages/datas/index';



import Err404 from '../components/err/404';
import Err500 from '../components/err/500';

class ReactRouter extends Component
{
    render()
    {
        return (
            <Router>
                <Switch>    
                    <Route path="/" component={Login} exact></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/admin">
                        <Frame>
                            <Switch>
                                <PrivateRouter path="/admin" component={Admin} exact></PrivateRouter>
                                <PrivateRouter path="/admin/articles" component={Articles} exact></PrivateRouter>
                                <PrivateRouter path="/admin/users" component={Users} exact></PrivateRouter>
                                <PrivateRouter path="/admin/rights" component={Right} exact></PrivateRouter>
                                <PrivateRouter path="/admin/roles" component={Role} exact></PrivateRouter>
                                <PrivateRouter path="/admin/roles/editor" component={RoleEd} exact></PrivateRouter>
                                <PrivateRouter path="/admin/roles/tree" component={Tree} exact></PrivateRouter>
                                <PrivateRouter path="/admin/goodscate" component={GoodsCate} exact></PrivateRouter>
                                <PrivateRouter path="/admin/addcate" component={Addcate} exact></PrivateRouter>
                                <PrivateRouter path="/admin/goodslist" component={GoodList} exact></PrivateRouter>
                                <PrivateRouter path="/admin/addgoods" component={AddGoods} exact></PrivateRouter>
                                <PrivateRouter path="/admin/orders" component={Orders} exact></PrivateRouter>
                                <PrivateRouter path="/admin/datas" component={Aatas} exact></PrivateRouter>
                                <Redirect to="/404" /> 
                            </Switch>
                        </Frame>
                    </Route>
                    <Route path="/404" component={Err404}></Route>
                    <Route path="/500" component={Err500}></Route>
                    <Redirect to="/404" /> 
                </Switch> 
            </Router>
        )
    } 
}

export default ReactRouter;