import React from 'react';
import StaffHeader from './StaffHeader.js';
import StaffItemPanel from './StaffItemPanel.js';
import StaffFooter from './StaffFooter.js';
import StaffDetail from './StaffDetail.js';

import STAFF from './STAFF.js';


class App extends React.Component {

  constructor() {
    super();
    //父组件才有state
    this.state = {
      staff: new STAFF,
      staffDetail: null
    }
  }


  //增加(父组件),更新了自己的state,只不过具体的逻辑在STAFF类的方法中完成
  addStaffItem(item) {
      this.setState({
        staff: this.state.staff.addStaffItem(item)
      });
    }
    //父组件中
    /*
     * 搜索
     */
  searchStaff(word) {
    this.setState({
      staff: this.state.staff.searchStaff(word)
    });
  }

  //删除
  removeStaffItem(key) {
    this.setState({
      staff: this.state.staff.removeStaffItem(key)
    });
  }

  //排序
  sortStaff(sortType) {
    this.setState({
      staff: this.state.staff.sortStaff(sortType)
    });
  }

  //筛选
  filterStaff(filterType) {
    this.setState({
      staff: this.state.staff.filterStaff(filterType)
    })
  }

  detailStaffItem(key) {
    this.setState({
      staffDetail: this.state.staff.staff.filter(item => {
        return item.key == key;
      })[0]
    });
  }
  closeDetail() {
    this.setState({
      staffDetail: null
    })
  }

  editDetail(item) {
    this.setState({
      staff: this.state.staff.editStaffItem(item)
    })
  }

  render() {
    return (
      <div>
          <StaffHeader searchStaff={this.searchStaff.bind(this)} sortStaff={this.sortStaff.bind(this)} filterStaff={this.filterStaff.bind(this)}/>
          <StaffItemPanel items={this.state.staff.staff} removeStaffItem={this.removeStaffItem.bind(this)} detailStaffItem={this.detailStaffItem.bind(this)}/> 
          <StaffFooter addStaffItem={this.addStaffItem.bind(this)}/>
          <StaffDetail staffDetail={this.state.staffDetail} closeDetail={this.closeDetail.bind(this)} editDetail={this.editDetail.bind(this)}/>
        </div>
    );
  }
}

React.render(<App />, document.getElementById('app'));