import React, { Component } from "react";
import { Card, Button, Table, message, Divider,Modal } from "antd";
import TypingCard from '@/components/TypingCard'
import AddEditform from "./forms/addEditform"
import { connect } from 'react-redux';
import { addSong, getSongsList, editSong, deleteSong } from "../../store/actions";
const { confirm } = Modal;
const { Column } = Table;
class Song extends Component {
  state = {
    modalType: null, // Add | Edit | null
  };


  handleEditSong = (obj = {}) => {
    this.setState({
      modalType: obj.id ? 'Edit' : null
    }, () => {
      if (obj.id) {
        const { form } = this.form.props;
        form.setFieldsValue(obj)
      }
    });
  };

  handleDeleteSong = (id) => {
    const self = this;
    confirm({
      title: 'Are you sure delete this record?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        self.props.deleteSong(id)
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
      if (err) {
        return;
      }
      if (this.state.modalType === 'Add') {
        this.props.addSong(values, (success=true) => {
          this.toggleModal();
        })
      } else {
        this.props.editSong(values, (success=true) => {
          this.handleEditSong();
        })
      }
    });
  };
  componentDidMount() {
    this.props.getSongsList()
  }
  render() {
    const { songsList, loading } = this.props;
    console.log(songsList, 'songsList');
    const title = (
      <span>
        <Button type='primary' onClick={()=>this.toggleModal("Add")}>Add Song</Button>
      </span>
    )
    const cardContent = `Here , you can manage songs in the system , such as adding a new song , or modifying or deletion.`
    return (
      <div className="app-container">
        <TypingCard title='Song Management' source={cardContent} />
        <br/>
        <Card title={title}>
          <Table bordered rowKey="id" dataSource={songsList} loading={loading.listing}>
            <Column title="#" dataIndex="sr" key="sr" align="center" render={(text, row, index) => 
               index + 1
            }/>
            <Column title="ID" dataIndex="id" key="id" align="center" />
            <Column title="Title" dataIndex="title" key="title" align="center" />
            <Column title="Singer" dataIndex="singer" key="singer" align="center"/>
            <Column title="Description" dataIndex="description" key="description" align="center"/>
            <Column title="Action" key="action" width={195} align="center"render={(text, row) => (
              <span>
                <Button type="primary" shape="circle" icon="edit" title="Edit" onClick={()=>this.handleEditSong(row)}/>
                <Divider type="vertical" />
                <Button type="primary" shape="circle" icon="delete" title="Delete" onClick={()=>this.handleDeleteSong(row.id)}/>
              </span>
            )}/>
          </Table>
        </Card>

          <AddEditform
            wrappedComponentRef={formRef => this.form = formRef}
            visible={this.state.modalType !== null}
            confirmLoading={loading.songModal}
            onCancel={this.handleCancel}
            onOk={this.handleOk}
            modalType={this.state.modalType}
          />
        
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  songsList: state.songs.songsList,
  loading: state.songs.loading
})
// Object of action creators
const mapDispatchToProps = {
  addSong,
  getSongsList,
  editSong,
  deleteSong
}

export default connect(mapStateToProps, mapDispatchToProps)(Song);
