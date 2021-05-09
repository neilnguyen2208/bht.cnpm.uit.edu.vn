import React from 'react'
import { Tree } from 'antd';
import 'antd/dist/antd.css';

class TreeView extends React.Component {

  onSelect = (selectedKeys, info) => {
    if (this.props.onNodeSelected)
      this.props.onNodeSelected(selectedKeys, info);
  };

  onCheck = (checkedKeys, info) => {
    if (this.props.onNodeChecked)
      this.props.onNodeChecked(checkedKeys, info);
  };


  render() {

    return (
      <Tree
        checkable
        // defaultExpandedKeys={['0-0-0', '0-0-1']}
        // defaultSelectedKeys={['0-0-0', '0-0-1']}
        // defaultCheckedKeys={['0-0-0', '0-0-1']}
        // onSelect={this.onSelect}
        // onCheck={this.onCheck}

        defaultExpandedKeys={this.props.defaultExpandedKeys}
        defaultSelectedKeys={this.props.defaultSelectedKeys}
        defaultCheckedKeys={this.props.defaultCheckedKeys}
        onSelect={this.onSelect}
        onCheck={this.onCheck}
        treeData={this.props.data}
      />
    );
  }
}
export default TreeView;