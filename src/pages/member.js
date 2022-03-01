import React from "react"
import {Modal} from "bootstrap";
import axios from "axios";

class Member extends React.Component{
    constructor(){
        super()
        this.state = {
            members: [
                {
                    id_member: "111", nama: "Hana Kamila Naura Yasmin",
                    alamat: "Tulungagung, Jawa Timur",
                    jenis_kelamin: "Wanita", telepon: "081234567890"
                },
                {
                    id_member: "112", nama: "Arsya Rahma Ayulistya",
                    alamat: "Tulungagung, Jawa Timur",
                    jenis_kelamin: "Wanita", telepon: "081234567899"
                },
                {
                    id_member: "113", nama: "Faradilla Roudhotul Sa'naa",
                    alamat: "Sidoarjo, Jawa Timur",
                    jenis_kelamin: "Wanita", telepon: "081234567895"
                },
            ],
            id_member: "",
            nama: "",
            alamat: "",
            telepon: "",
            jenis_kelamin:"",
            action: "" //untuk menyimpan aksi dari tambah atau ubah data
        }
    }

    tambahData() {
        //memunculkan modal
        this.modalMember = new Modal(document.getElementById("modal-member"))
        this.modalMember.show()

        //mengosongkan inputannnya
        this.setState({
            nama: "", alamat: "", telepon: "", jenis_kelamin: "",
            id_member: Math.random(1,1000), action: "tambah"
        })
    }

    simpanData(event){
        event.preventDefault()
        //mencegah berjalannya aksi default
        //
        //

        this.modalMember.hide()

        //cek aksi tambah atau ubah
        if (this.state.action === "tambah") {
            let endpoint = "http://localhost:8000/member"
            //menampung data dari user
            let newMember = {
                id_member: this.state.id_member,
                nama : this.state.nama,
                alamat: this.state.alamat,
                telepon: this.state.telepon,
                jenis_kelamin: this.state.jenis_kelamin
            }

            // let temp = this.state.members
            // temp.push(newMember)

            // this.setState({member: temp})

            axios.post(endpoint, newMember)
                 .then(response => {
                     window.alert(response.data.message)
                     this.getData()
                 })

                 .catch(error => console.log(error))

        } else if(this.state.action === "ubah") {
            this.modalMember.hide()
            let endpoint = "http://localhost:8000/member/" + this.state.id_member
            let newMember = {
                id_member: this.state.id_member,
                nama : this.state.nama,
                alamat: this.state.alamat,
                telepon: this.state.telepon,
                jenis_kelamin: this.state.jenis_kelamin
            }

            axios.put(endpoint, newMember)
            .then(response => {
                window.alert(response.data.message)
                this.getData()
            })

            .catch(error => console.log(error))
            
            //mencari posisi index dari data member
            // berdasarkan id member pada array 'members'

            //  let index = this.state.members.findIndex(
            //  member => member.id_member === this.state.id_member)

            //  let temp = this.state.members
            //  temp[index].nama = this.state.nama
            //  temp[index].alamat = this.state.alamat
            //  temp[index].telepon = this.state.telepon
            //  temp[index].jenis_kelamin = this.state.jenis_kelamin

            //  this.setState({ members: temp })
        }
    }

    ubahData(id_member){
        this.modalMember = new Modal(document.getElementById("modal-member"))
        this.modalMember.show()

        //mencari posisi index dari data member
        // berdasarkan id member pada array 'members'

        let index = this.state.members.findIndex(
            member => member.id_member === id_member)

        this.setState({
            id_member: this.state.members[index].id_member,
            nama: this.state.members[index].nama,
            alamat: this.state.members[index].alamat,
            jenis_kelamin: this.state.members[index].jenis_kelamin,
            telepon: this.state.members[index].telepon,
            action: "ubah"
        })
    }

    hapusData(id_member) {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            let endpoint = "http://localhost:8000/member/" + id_member

                axios.delete(endpoint)
                     .then(response => {
                         window.alert(response.data.message)
                         this.getData()
                     })
                     .catch(error => console.log(error))


            // mencari posisi index dari data yang akan dihapus
             let temp = this.state.members
             let index = temp.findIndex(
                 member => member.id_member === id_member
             )

             //menghapus data pada array
             temp.splice(index, 1)

             this.setState({ members: temp })
        }
    }

    getData() {
        let endpoint = "http://localhost:8000/member"
        axios.get(endpoint)
             .then(response => {
                 this.setState({ members: response.data })
             })
             .catch(error => console.log(error))
    }

    componentDidMount() {
        //fungsi ini dijalankan setelah fungsi render
        this.getData()
    }

    render(){
        return(
            
            <div className="card">
                <div className="card-header bg-secondary">
                    <h4 className="text-white">
                    List Daftar Member 
                    </h4>
                </div>

                <div className="card-body">
                <ul className="list-group">
                    {this.state.members.map(member => (
                        <li className="list-group-item">
                            <div className="row">
                                {/*bagian utk nama*/}
                                <div className="col-lg-5">
                                    <small className="text-info">Nama</small> <br />
                                    {member.nama}
                                </div>

                                {/*bagian utk gender*/}
                                <div className="col-lg-3">
                                    <small className="text-info">Gender</small> <br />
                                    {member.jenis_kelamin}
                                </div>
                                {/*bagian utk telepon*/}
                                <div className="col-lg-2">
                                    <small className="text-info">Telepon</small> <br />
                                    {member.telepon}
                                </div>
                                <div className="col-lg-2">
                                    <button type="button" class="btn btn-warning btn-sm mx-2"
                                    onClick={() => this.ubahData(member.id_member)}>Edit</button>

                                    <button type="button" class="btn btn-danger btn-sm mx-2"
                                    onClick={() => this.hapusData(member.id_member)}>Delete</button>
                                </div>
                                {/*bagian utk alamat*/}
                                <div className="col-lg-2">
                                    <small className="text-info">Alamat</small> <br />
                                    {member.alamat}
                                </div>


                            </div>

                        </li>
                    ))}
                </ul>

            </div>
                
        <div className="col-lg-5"> 
            <button className="btn btn-success mx-3"
            onClick={() => this.tambahData()}>
                Tambah Data
            </button>

        </div>

        {/*form modal member*/}
        <div className="modal" id="modal-member">
            <div className="modal-dialog modal-md">
                <div className="modal-content">
                    <div className="modal-header bg-warning">
                        <h4 className="text-white">
                            Form Member
                        </h4>
                    </div>

                <div className="modal-body">
                    <form onSubmit={ev => this.simpanData(ev)}>
                        Nama
                        <input type="text" className="form-control mb-2"
                        value={this.state.nama}
                        onChange={ev => this.setState({nama: ev.target.value})}
                        required />

                        Alamat
                        <input type="text" className="form-control mb-2"
                        value={this.state.alamat}
                        onChange={ev => this.setState({alamat: ev.target.value})}
                        required />

                        Telepon
                        <input type="text" className="form-control mb-2"
                        value={this.state.telepon}
                        onChange={ev => this.setState({telepon: ev.target.value})}
                        required />

                        Jenis Kelamin
                        <select className="form-control mb-2"
                        value={this.state.jenis_kelamin}
                        onChange={ev => this.setState({jenis_kelamin: ev.target.value})}>
                            <option value="Pria">Pria</option>
                            <option value="Wanita">Wanita</option>
                        </select>

                        <button className="btn btn-success btn-small" type="submit">
                            Save
                        </button>

                    </form>
                </div>

                </div>
            </div>
        </div>

            </div>
        )
    }
}

export default Member

