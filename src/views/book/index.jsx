import React, { Component } from "react";
import { Card, Button, Table, Tag, Divider,Modal } from "antd";
import TypingCard from '@/components/TypingCard'
import AddEditform from "./forms/addEditform"
import { connect } from 'react-redux';
import { addBook, getBooksList, editBook, deleteBook } from "../../store/actions";
const { confirm } = Modal;
const { Column } = Table;
class Book extends Component {
  state = {
    modalType: null, // Add | Edit | null
  };


  handleEditBook = (obj = {}) => {
    this.setState({
      modalType: obj.id ? 'Edit' : null
    }, () => {
      if (obj.id) {
        const { form } = this.form.props;
        form.setFieldsValue(obj)
      }
    });
  };

  handleDeleteBook = (id) => {
    const self = this;
    confirm({
      title: 'Are you sure delete this record?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        self.props.deleteBook(id)
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
        this.props.addBook(values, (success=true) => {
          this.toggleModal();
        })
      } else {
        this.props.editBook(values, (success=true) => {
          this.handleEditBook();
        })
      }
    });
  };
  componentDidMount() {
    this.props.getBooksList()
  }
  render() {
    const { booksList, loading } = this.props;
    console.log(booksList, 'booksList');
    const title = (
      <span>
        <Button type='primary' onClick={()=>this.toggleModal("Add")}>Add Book</Button>
      </span>
    )
    const cardContent = `Here , you can manage books in the system , such as adding a new book , or modifying or deletion.`
    return (
      <div className="app-container">
        <TypingCard title='Book Management' source={cardContent} />
        <br/>
        <Card title={title}>
          <Table bordered rowKey="id" dataSource={booksList} loading={loading.listing}>
            <Column title="#" dataIndex="sr" key="sr" align="center" render={(text, row, index) => 
               index + 1
            }/>
            <Column title="ID" dataIndex="id" key="id" align="center" />
            <Column title="Name" dataIndex="name" key="name" align="center" />
            <Column title="Tags" dataIndex="tags" key="tags" align="center" render={(text) => {
              return text?.map(tag => <Tag color="cyan" style={{margin: 2}}>{tag}</Tag>)
            }} />
            <Column title="Description" dataIndex="description" key="description" align="center"/>
            <Column title="Action" key="action" width={195} align="center"render={(text, row) => (
              <span>
                <Button type="primary" shape="circle" icon="edit" title="Edit" onClick={()=>this.handleEditBook(row)}/>
                <Divider type="vertical" />
                <Button type="primary" shape="circle" icon="delete" title="Delete" onClick={()=>this.handleDeleteBook(row.id)}/>
              </span>
            )}/>
          </Table>
        </Card>

          <AddEditform
            wrappedComponentRef={formRef => this.form = formRef}
            visible={this.state.modalType !== null}
            confirmLoading={loading.bookModal}
            onCancel={this.handleCancel}
            onOk={this.handleOk}
            modalType={this.state.modalType}
          />
        
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  booksList: state.books.booksList,
  loading: state.books.loading
})
// Object of action creators
const mapDispatchToProps = {
  addBook,
  getBooksList,
  editBook,
  deleteBook
}

export default connect(mapStateToProps, mapDispatchToProps)(Book);
