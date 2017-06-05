import React from 'react';
export default class StaffHeader extends React.Component {
  //search
  handlerSearch() {
      let bar = React.findDOMNode(this.refs.searchBar);
      let value = bar.value;
      this.props.searchStaff(value);
    }
    //排序
  handlerOrderChange() {
    let sel = React.findDOMNode(this.refs.selOrder);
    let selvalue = sel.options[sel.selectedIndex].value;
    this.props.sortStaff(selvalue);
  }

  //筛选
  handleIdChange() {
    let sel = React.findDOMNode(this.refs.selId);
    let selValue = sel.options[sel.selectedIndex].value;
    console.log(selValue)
    this.props.filterStaff(selValue);
  }


  render() {
    return (
      <div>
              <h3 style={{'text-align':'center'}}>人员管理系统</h3>
              <table className="optHeader">
                <tbody>
                  <tr>
                    <td className="headerTd"><input ref='searchBar' type='text' onChange={this.handlerSearch.bind(this)} placeholder='Search...' /></td>
                    <td className="headerTd">
                        <label for='idSelect'>人员筛选</label>
                        <select id='idSelect' ref='selId' onChange={this.handleIdChange.bind(this)}>
                            <option value='0'>全部</option>
                            <option value='1'>主任</option>
                            <option value='2'>老师</option>
                            <option value='3'>学生</option>
                            <option value='4'>实习</option>
                        </select>
                    </td>
                    <td>
                        <label for='orderSelect'>排列方式</label>
                        <select id='orderSelect' ref='selOrder' onChange={this.handlerOrderChange.bind(this)}>
                            <option value='0'>身份</option>
                            <option value='1'>年龄升</option>
                            <option value='2'>年龄降</option>
                        </select>
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>
    );
  }
}