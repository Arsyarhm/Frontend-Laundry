import React from "react";
import { Modal } from "bootstrap";
import axios from "axios";

class User extends React.Component {
constructor(){
        super()
        this.state = {
            id_user: "",
            nama: "",
            username: "",
            password: "",
            role: "",
            users: [
                {
                    id_user: "1", nama: "Amanda", 
                    username: "mandarawles", role: "admin"
                },
                {
                    id_user: "2", nama: "Jefri", 
                    username: "jefrinichole", role: "admin"
                },
                {
                    id_user: "3", nama: "Putri", 
                    username: "putrimalino", role: "admin"
                }
            ]
        }
    }

    tambahData() {
        this.modalUser = new Modal(document.getElementById("modal_user"))
        this.modalUser.show() // menampilkan modal

        // reset state untuk form user
        this.setState({
            action: "tambah",
            id_user: Math.random(1, 1000), 
            nama:"", 
            username: "",
            password: "",
            role: "Admin"
        })
    }

    ubahData(id_user){
        this.modalUser = new Modal(document.getElementById("modal_user"))
        this.modalUser.show() // menampilkan modal

        // mencari index posisi dari data user yang akan diubah
        let index = this.state.users.findIndex(
            user => user.id_user === id_user
        )

        this.setState({
            action: "ubah",
            id_user: id_user,
            nama: this.state.users[index].nama,
            username: this.state.users[index].username,
            password: this.state.users[index].password,
            role: this.state.users[index].role
        })

    }

    hapusData(id_user) {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini ?")) {

            let endpoint = "http://localhost:8000/users/" + id_user 

            axios.delete(endpoint)
            .then(response => {
                window.alert(response.data.message)
                this.getData()
            })
            .catch(error => console.log(error))
            // mencari posisi index dari data yang akan dihapus
            // let temp = this.state.pakets
            // let index = temp.findIndex(user => user.id_paket === id_paket)

            // menghapus data pada array
            // temp.splice(index,1)

            // this.setState({pakets: temp})
        }
    }

    simpanData(event) {
        event.preventDefault();
        // preventDefault -> mencegah aksi default dari form submit

        // cek aksi tambah atau ubah
        if (this.state.action === "tambah") {
            let endpoint = "http://localhost:8000/users"
            // menampung data isian dalam user
            let data = {
                id_user: this.state.id_user,
                nama: this.state.nama,
                username: this.state.username,
                password: this.state.password,
                role: this.state.role
            }

            // tambahkan ke state array pakets
            // let temp = this.state.pakets
            // temp.push(data) // menambah data pada array
            // this.setState({ pakets: temp })
            axios.post(endpoint, data)
            .then(response => {
                window.alert(response.data.message)
                this.getData()
            })
            .catch(error => console.log(error))

            // menghilangkan modal
            this.modalUser.hide()
        } else if (this.state.action === "ubah") {
            let endpoint = "http://localhost:8000/users/" + this.state.id_user

            let data = {
                id_user: this.state.id_user,
                nama: this.state.nama,
                username: this.state.username,
                password: this.state.password,
                role: this.state.role

            }

            axios.put(endpoint, data)
            .then(response => {
                window.alert(response.data.message)
                this.getData()
            })
            .catch(error => console.log(error))
            // let temp = this.state.pakets
            // let index = temp.findIndex(
            //     user => user.id_paket === this.state.id_paket
            // )

            // temp[index].nama = this.state.nama
            // temp[index].alamat = this.state.alamat
            // temp[index].jenis_kelamin = this.state.jenis_kelamin
            // temp[index].telepon = this.state.telepon

            // this.setState({pakets: temp})

            this.modalUser.hide()
        }
    }

    getData(){
        let endpoint = "http://localhost:8000/users"
        axios.get(endpoint)
        .then(response => {
            this.setState({users: response.data})
        })
        .catch(error => console.log(error))
    }


    componentDidMount(){
        // fungsi ini dijalankan setelah fungsi render berjalan
        this.getData()
    }

    render() {
        return (
            // <div className="container">
                <div className="card">
                    <div className="card-header">
                        <div className="card-header bg-success">
                            <h3 className="text-white">
                                List of User
                            </h3>
                        </div>
                    </div>
                    <div className="card-body">
                        <ul className="list-group">
                            {this.state.users.map(user => (
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <small className="text-info"> Nama </small> <br />
                                            <h5>{user.nama}</h5>
                                        </div>
                                        <div className="col-lg-3">
                                            <small className="text-info"> Username <br /></small>
                                            <h5>{user.username}</h5>
                                        </div>
                                        <div className="col-lg-3">
                                            <small className="text-info"> Role <br /></small>
                                            <h5>{user.role}</h5>
                                        </div>
                                        <div className="col-lg-2">
                                            <small className="text-info">Action <br /></small>
                                            <button className="btn btn-warning btn-sm mx-1" 
                                            onClick={() => this.ubahData(user.id_user)}>
                                                Edit
                                            </button>

                                            <button className="btn btn-danger btn-sm"
                                            onClick={() => this.hapusData(user.id_user)}>
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button className="btn btn-success my-2"
                            onClick={() => this.tambahData()}>
                            Tambah Data
                        </button>
                    </div>
                    <div className="modal" id="modal_user">
                        <div className="modal-dialog modal-md">
                            <div className="modal-content">
                                <div className="modal-header bg-success">
                                    <h4 className="text-title">
                                        Form Data User
                                    </h4>
                                </div>

                                <div className="modal-body">
                                    <form onSubmit={ev => this.simpanData(ev)}>
                                        Nama
                                        <input type="text" className="form-control mb-2"
                                            value={this.state.nama}
                                            onChange={(ev) => this.setState({ nama: ev.target.value })} />


                                        Username
                                        <input type="text" className="form-control mb-2"
                                            value={this.state.username}
                                            onChange={(ev) => this.setState({ username: ev.target.value })} />

                                        Password
                                        <input type="text" className="form-control mb-2"
                                            value={this.state.password}
                                            onChange={(ev) => this.setState({ password: ev.target.value })} />

                                        Role
                                        <select className="form-control mb-2"
                                            value={this.state.role}
                                            onChange={(ev) => this.setState({ role: ev.target.value })}>
                                            <option value="Kasir">Kasir</option>
                                            <option value="Admin">Admin</option>
                                        </select>


                                        <button className="btn btn-success" type="submit">Simpan</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            // </div>
        )
    }
}
export default User