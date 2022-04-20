import React, { Component } from "react";
import { Card, Button, Table, message, Divider,Modal } from "antd";
import TypingCard from '@/components/TypingCard'
import AddEditform from "./forms/addEditform"
import { connect } from 'react-redux';
import moment from "moment"
import { addReward, getRewardsList, editReward, deleteReward,  getSongsList,
  getMoviesList,
  getBooksList,
  getQuotesList,
getNewsList} from "../../store/actions";
const { confirm } = Modal;
const { Column } = Table;
class Reward extends Component {
  state = {
    modalType: null, // Add | Edit | null
  };


  handleEditReward = (obj = {}) => {
    this.setState({
      modalType: obj.id ? 'Edit' : null
    }, () => {
      if (obj.id) {
        
        const { form } = this.form.props;
        obj.start_time = moment(obj.start_time)
        obj.end_time = moment(obj.end_time)
        console.log(obj, 'obj is thje');
        form.setFieldsValue(obj)
      }
    });
  };

  handleDeleteReward = (id) => {
    const self = this;
    confirm({
      title: 'Are you sure delete this record?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        self.props.deleteReward(id)
      },
    });
  }

  toggleModal = (type = null) => {
    this.setState({
      modalType: type,
    });
  };

  handleCancel = () => {
    this.toggleModal()
  }

  handleOk = _ => {
    const { form } = this.form.props;
    form.validateFields((err, values) => {

      console.log(values, 'values');
      if (err) {
        return;
      }
      values.start_time = values.start_time.toISOString();
      values.end_time = values.end_time.toISOString();

      if (this.state.modalType === 'Add') {
        this.props.addReward(values, (success=true) => {
          this.toggleModal();
        })
      } else {
        console.log(values, 'values ar the');
        this.props.editReward(values, (success=true) => {
          this.handleEditReward();
        })
      }
    });
  };
  componentDidMount() {
    this.props.getRewardsList();
    this.getAllData()
  }

   getAllData() {
    this.props.getSongsList();
    this.props.getMoviesList();
    this.props.getBooksList();
     this.props.getQuotesList();
     this.props.getNewsList()
  }

  render() {
    const { rewardsList, loading } = this.props;
    console.log(rewardsList, 'rewardsList');
    const title = (
      <span>
        <Button type='primary' onClick={()=>this.toggleModal("Add")}>Add Reward</Button>
      </span>
    )
    const cardContent = `Here , you can manage rewards in the system , such as adding a new reward , or modifying or deletion.`
    return (
      <div className="app-container">
        <TypingCard title='Reward Management' source={cardContent} />
        <br/>
        <Card title={title}>
          <Table bordered rowKey="id" dataSource={rewardsList} loading={loading.listing}>
            <Column title="#" dataIndex="sr" key="sr" align="center" render={(text, row, index) => 
               index + 1
            } />
            <Column title="ID" dataIndex="id" key="id" align="center" />
            <Column title="Start Time" dataIndex="start_time" key="start_time" align="center" render={(text) => moment(text).format("YYYY-MM-DD HH:mm:ss")} />
            <Column title="End Time" dataIndex="end_time" key="end_time" align="center" render={(text) => moment(text).format("YYYY-MM-DD HH:mm:ss")} />
            <Column title="Game" dataIndex="game" key="game" align="center" />
            <Column title="Reward Type" dataIndex="reward_type" key="reward_type" align="center"/>
            <Column title="Reward" dataIndex="reward" key="reward" align="center"/>
            <Column title="Action" key="action" width={195} align="center"render={(text, row) => (
              <span>
                <Button type="primary" shape="circle" icon="edit" title="Edit" onClick={()=>this.handleEditReward(row)}/>
                <Divider type="vertical" />
                <Button type="primary" shape="circle" icon="delete" title="Delete" onClick={()=>this.handleDeleteReward(row.id)}/>
              </span>
            )}/>
          </Table>
        </Card>

          <AddEditform
            wrappedComponentRef={formRef => this.form = formRef}
            visible={this.state.modalType !== null}
            confirmLoading={loading.rewardModal}
            onCancel={this.handleCancel}
            onOk={this.handleOk}
          modalType={this.state.modalType}
          songsList={this.props.songsList}
          moviesList={this.props.moviesList}
          quotesList={this.props.quotesList}
          booksList={this.props.booksList}
          newsList={this.props.newsList}
          />
        
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  rewardsList: state.rewards.rewardsList,
  songsList: state.songs.songsList,
  moviesList: state.movies.moviesList,
  quotesList: state.quotes.quotesList,
  booksList: state.books.booksList,
  newsList: state.news.newsList,
  loading: state.rewards.loading
})
// Object of action creators
const mapDispatchToProps = {
  addReward,
  getRewardsList,
  getSongsList,
  getMoviesList,
  getBooksList,
  getQuotesList,
  getNewsList,
  editReward,
  deleteReward
}

export default connect(mapStateToProps, mapDispatchToProps)(Reward);
