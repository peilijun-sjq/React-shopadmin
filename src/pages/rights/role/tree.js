import { Tree,Card,Button } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';

import {getRightList,giveRoleRights } from '../../../api/index'
const { TreeNode } = Tree;

 class TreeDe extends React.Component {
  state = {
    expandedKeys: [],
    autoExpandParent: true,
    checkedKeys: [],
    selectedKeys: [],
    treeData:[]
  };

  onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onCheck = checkedKeys => {
    // console.log('onCheck', checkedKeys);
    let uId=JSON.parse(localStorage.getItem('roleTree')).id

    console.log(uId,'uid');
    let aa=checkedKeys.join(',')
    console.log(aa,'aa');
    giveRoleRights(parseInt(uId),aa).then(res=>{
      console.log(res);
    })
    this.setState({ checkedKeys });
  };

  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  };

  renderTreeNodes = data =>
  {
  // return <TreeNode title={222222} key={222}>1111</TreeNode>
  return data.map(item => {
      if (item.children) {
        // console.log(item.authName,'data');
        return (
          <TreeNode title={item.authName} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
          // <TreeNode title={2} key={222}>32</TreeNode>
        );
      }
      return <TreeNode title={item.authName} key={item.id} {...item} dataRef={item} />;
    });
  }
    
componentDidMount(){
  getRightList('tree').then(res=>{
    // console.log(res.data,'res')
    this.setState({
        treeData:res.data,
    })
  })
  this.roleKeyFn()
}

roleKeyFn(){
  let t=JSON.parse(localStorage.getItem('roleTree'))
  // console.log(t,'t');
  t.children.map((item1,index1)=>{
    if(item1.children){
       item1.children.map((item2,index2)=>{
        if(item2.children){
           item2.children.map((item3,index3)=>{
            return this.state.checkedKeys.push(item3.id)
          })
        }
      })
    }
  })
}
  render() {
    return (
      <div>
         <Card title="分配权限"  extra={<Link to='/admin/roles'><Button type="primary">退出</Button></Link>}>
         <Tree
          checkable
          onExpand={this.onExpand}
          expandedKeys={this.state.expandedKeys}
          autoExpandParent={this.state.autoExpandParent}
          onCheck={this.onCheck}
          checkedKeys={this.state.checkedKeys}
          onSelect={this.onSelect}
          selectedKeys={this.state.selectedKeys}
        >
           
          {this.renderTreeNodes(this.state.treeData)}
        </Tree>
        </Card>
      </div>
      
    );
  }
}

export default TreeDe

