import React, { Component } from 'react';
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase'





class ProfilePage extends Component {
    state = {
    username: '',
    avatar: '',
    isUploading: false,
    progress: 0,
    avatarURL: ''
    };
    handleChangeUsername = (event) => this.setState({username: event.target.value});
    handleUploadStart = () => this.setState({isUploading: true, progress: 0});
    handleProgress = (progress) => this.setState({progress});
    handleUploadError = (error) => {
    this.setState({isUploading: false});
    console.error(error);
    }
    handleUploadSuccess = (filename) => {
    this.setState({avatar: filename, progress: 100, isUploading: false});
    firebase.storage().child(filename).getDownloadURL().then(url => this.setState({avatarURL: url}));
    };

    render() {
        return (
            <div>
                <form>
                    <label>Username:</label>
                    <input type="text" value={this.state.username} name="username" onChange={this.handleChangeUsername} />
                    <label>Avatar:</label>
                    {this.state.isUploading &&
                    <p>Progress: {this.state.progress}</p>
                    }
                    {this.state.avatarURL &&
                    <img src={this.state.avatarURL} />
                    }
                    <img src={this.state.avatarURL} />
                    <label style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, pointer: 'cursor'}}>
                    Select your awesome avatar
                    <FileUploader
                        accept="image/*"
                        name="avatar"
                        filename={file => this.state.username + file.name.split('.')[1] }
                        storageRef={firebase.storage().ref('images')}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                    />
                    </label>



                </form>
                
            </div>
    );
    }
    }
export default ProfilePage;