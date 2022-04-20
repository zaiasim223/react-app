import React, { Component } from "react";
import { Card, Button, Table, message, Divider,Modal } from "antd";
import TypingCard from '@/components/TypingCard'
import AddEditform from "./forms/addEditform"
import { connect } from 'react-redux';
import moment from "moment";
import { addNews, getNewsList, editNews, deleteNews } from "../../store/actions";
const { confirm } = Modal;
const { Column } = Table;
class News extends Component {
  state = {
    modalType: null, // Add | Edit | null
  };


  handleEditNews = (obj = {}) => {
    this.setState({
      modalType: obj.id ? 'Edit' : null
    }, () => {
      if (obj.id) {
        const { form } = this.form.props;
        obj.date_time = moment(obj.date_time)
        form.setFieldsValue(obj)
      }
    });
  };

  handleDeleteNews = (id) => {
    const self = this;
    confirm({
      title: 'Are you sure delete this record?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        self.props.deleteNews(id)
      },
    });
  }

  toggleModal = (type=null) => {
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
      if (err) {
        return;
      }

      values.date_time = values.date_time.toISOString();
      if (this.state.modalType === 'Add') {
        this.props.addNews(values, (success=true) => {
          this.toggleModal();
        })
      } else {
        this.props.editNews(values, (success=true) => {
          this.handleEditNews();
        })
      }
    });
  };
  componentDidMount() {
    this.props.getNewsList()
  }
  render() {
    const { newsList, loading } = this.props;
    const title = (
      <span>
        <Button type='primary' onClick={()=>this.toggleModal("Add")}>Add News</Button>
      </span>
    )
    const cardContent = `Here , you can manage news in the system , such as adding a new news , or modifying or deletion.`
    return (
      <div className="app-container">
        <TypingCard title='News Management' source={cardContent} />
        <br/>
        <Card title={title}>
          <Table bordered rowKey="id" dataSource={newsList} loading={loading.listing}>
            <Column title="#" dataIndex="sr" key="sr" align="center" render={(text, row, index) => 
               index + 1
            }/>
          <Column title="ID" dataIndex="id" key="id" align="center" />
            <Column title="Heading" dataIndex="heading" key="heading" align="center" />
            <Column title="Description" dataIndex="description" key="description" align="center" render={(text) =>
             text?.length > 200 ? `${text.substring(0,200)}...` : text
            }/>
            <Column title="Date Time" dataIndex="date_time" key="date_time" align="center" render={(text) => moment(text).format("YYYY-MM-DD HH:mm:ss")} />
            <Column title="Action" key="action" width={195} align="center"render={(text, row) => (
              <span>
                <Button type="primary" shape="circle" icon="edit" title="Edit" onClick={()=>this.handleEditNews(row)}/>
                <Divider type="vertical" />
                <Button type="primary" shape="circle" icon="delete" title="Delete" onClick={()=>this.handleDeleteNews(row.id)}/>
              </span>
            )}/>
          </Table>
        </Card>

          <AddEditform
            wrappedComponentRef={formRef => this.form = formRef}
            visible={this.state.modalType !== null}
            confirmLoading={loading.newsModal}
            onCancel={this.handleCancel}
            onOk={this.handleOk}
            modalType={this.state.modalType}
          />
        
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  newsList: state.news.newsList,
  loading: state.news.loading
})
// Object of action creators
const mapDispatchToProps = {
  addNews,
  getNewsList,
  editNews,
  deleteNews
}

export default connect(mapStateToProps, mapDispatchToProps)(News);
