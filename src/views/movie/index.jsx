import React, { Component } from "react";
import { Card, Button, Table, message, Divider,Modal } from "antd";
import TypingCard from '@/components/TypingCard'
import AddEditform from "./forms/addEditform"
import { connect } from 'react-redux';
import { addMovie, getMoviesList, editMovie, deleteMovie } from "../../store/actions";
const { confirm } = Modal;
const { Column } = Table;
class Movie extends Component {
  state = {
    modalType: null, // Add | Edit | null
  };


  handleEditMovie = (obj = {}) => {
    this.setState({
      modalType: obj.id ? 'Edit' : null
    }, () => {
      if (obj.id) {
        const { form } = this.form.props;
        form.setFieldsValue(obj)
      }
    });
  };

  handleDeleteMovie = (id) => {
    const self = this;
    confirm({
      title: 'Are you sure delete this record?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        self.props.deleteMovie(id)
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
        this.props.addMovie(values, (success=true) => {
          this.toggleModal();
        })
      } else {
        this.props.editMovie(values, (success=true) => {
          this.handleEditMovie();
        })
      }
    });
  };
  componentDidMount() {
    this.props.getMoviesList()
  }
  render() {
    const { moviesList, loading } = this.props;
    console.log(moviesList, 'moviesList');
    const title = (
      <span>
        <Button type='primary' onClick={()=>this.toggleModal("Add")}>Add Movie</Button>
      </span>
    )
    const cardContent = `Here , you can manage movies in the system , such as adding a new movie , or modifying or deletion.`
    return (
      <div className="app-container">
        <TypingCard title='Movie Management' source={cardContent} />
        <br/>
        <Card title={title}>
          <Table bordered rowKey="id" dataSource={moviesList} loading={loading.listing}>
            <Column title="#" dataIndex="sr" key="sr" align="center" render={(text, row, index) => 
               index + 1
            }/>
            <Column title="ID" dataIndex="id" key="id" align="center" />
            <Column title="Name" dataIndex="name" key="name" align="center" />
            <Column title="Writer" dataIndex="writer" key="writer" align="center"/>
            <Column title="Duration" dataIndex="duration" key="duration" align="center"/>
            <Column title="Action" key="action" width={195} align="center"render={(text, row) => (
              <span>
                <Button type="primary" shape="circle" icon="edit" title="Edit" onClick={()=>this.handleEditMovie(row)}/>
                <Divider type="vertical" />
                <Button type="primary" shape="circle" icon="delete" title="Delete" onClick={()=>this.handleDeleteMovie(row.id)}/>
              </span>
            )}/>
          </Table>
        </Card>

          <AddEditform
            wrappedComponentRef={formRef => this.form = formRef}
            visible={this.state.modalType !== null}
            confirmLoading={loading.movieModal}
            onCancel={this.handleCancel}
            onOk={this.handleOk}
            modalType={this.state.modalType}
          />
        
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  moviesList: state.movies.moviesList,
  loading: state.movies.loading
})
// Object of action creators
const mapDispatchToProps = {
  addMovie,
  getMoviesList,
  editMovie,
  deleteMovie
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
