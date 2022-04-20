import React, { Component } from "react";
import { Card, Button, Table, message, Divider,Modal } from "antd";
import TypingCard from '@/components/TypingCard'
import AddEditform from "./forms/addEditform"
import { connect } from 'react-redux';
import { addQuote, getQuotesList, editQuote, deleteQuote } from "../../store/actions";
const { confirm } = Modal;
const { Column } = Table;
class Quote extends Component {
  state = {
    modalType: null, // Add | Edit | null
  };


  handleEditQuote = (obj = {}) => {
    this.setState({
      modalType: obj.id ? 'Edit' : null
    }, () => {
      if (obj.id) {
        const { form } = this.form.props;
        form.setFieldsValue(obj)
      }
    });
  };

  handleDeleteQuote = (id) => {
    const self = this;
    confirm({
      title: 'Are you sure delete this record?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        self.props.deleteQuote(id)
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
      if (this.state.modalType === 'Add') {
        this.props.addQuote(values, (success=true) => {
          this.toggleModal();
        })
      } else {
        this.props.editQuote(values, (success=true) => {
          this.handleEditQuote();
        })
      }
    });
  };
  componentDidMount() {
    this.props.getQuotesList()
  }
  render() {
    const { quotesList, loading } = this.props;
    const title = (
      <span>
        <Button type='primary' onClick={()=>this.toggleModal("Add")}>Add Quote</Button>
      </span>
    )
    const cardContent = `Here , you can manage quotes in the system , such as adding a new quote , or modifying or deletion.`
    return (
      <div className="app-container">
        <TypingCard title='Quote Management' source={cardContent} />
        <br/>
        <Card title={title}>
          <Table bordered rowKey="id" dataSource={quotesList} loading={loading.listing}>
            <Column title="#" dataIndex="sr" key="sr" align="center" render={(text, row, index) => 
               index + 1
            }/>
            <Column title="ID" dataIndex="id" key="id" align="center" />
            <Column title="Writer" dataIndex="writer" key="writer" align="center"/>
            <Column title="Text" dataIndex="text" key="text" align="center" render={(text) =>
             text?.length > 200 ? `${text.substring(0,200)}...` : text
            } />
            <Column title="操作" key="action" width={195} align="center"render={(text, row) => (
              <span>
                <Button type="primary" shape="circle" icon="edit" title="Edit" onClick={()=>this.handleEditQuote(row)}/>
                <Divider type="vertical" />
                <Button type="primary" shape="circle" icon="delete" title="Delete" onClick={()=>this.handleDeleteQuote(row.id)}/>
              </span>
            )}/>
          </Table>
        </Card>

          <AddEditform
            wrappedComponentRef={formRef => this.form = formRef}
            visible={this.state.modalType !== null}
            confirmLoading={loading.quoteModal}
            onCancel={this.handleCancel}
            onOk={this.handleOk}
            modalType={this.state.modalType}
          />
        
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  quotesList: state.quotes.quotesList,
  loading: state.quotes.loading
})
// Object of action creators
const mapDispatchToProps = {
  addQuote,
  getQuotesList,
  editQuote,
  deleteQuote
}

export default connect(mapStateToProps, mapDispatchToProps)(Quote);
