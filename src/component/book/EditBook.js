import React,{useState,useContext} from 'react';
import { Modal,Button,Alert,Dropdown,Uploader } from 'rsuite';
import { Col, Container, Row,Input,Label,FormText } from "reactstrap";
import { useKeycloak } from "@react-keycloak/web";
import './book.css';
import axios from 'axios';

const EditBook = ({show, onToggle,updateTable,bookid,bookname,auth,lang,typ,seri,originalbook,originalauthor,isavailable,img}) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const imagePath = `images/`;
  const { keycloak } = useKeycloak();
  const [bookId,setBookId] = useState(bookid);
  const [name,setName] = useState(bookname);
  const [author,setAuthor] = useState(auth);
  const [language,setLanguage] = useState(lang);
  const [nameIsValid, setNameIsValid] = useState(true);
  const [authorIsValid, setAuthorIsValid] = useState(true);
  const [type,setType] = useState(typ);
  const [series,setSeries] = useState(seri);
  const [image, setImage] = useState(img);
  const [originalBook,setOriginalBook] = useState(originalbook);
  const [originalAuthor,setOriginalAuthor] = useState(originalauthor);
  const [isAvailable, setIsAvailable] = useState(isavailable);
  const [updatedImage, setUpdatedImage] = useState([]);

  const maxFileSize = 8 * 1024 * 1024;
  const filetype = [".jpeg",".png",".jpg"]

  const applyToggle = () => {
      if(onToggle) {
          onToggle(false);
      }
    };

  const nameOnChangeEvent = (name) => {
    setName(name);
    if(name === undefined || name.length === 0){
      setNameIsValid(false);
      return false;
    }
    else{
      setNameIsValid(true);
      return true;
    }
  }

  const authorOnChangeEvent = (aut) => {
    setAuthor(aut);
    if(aut === undefined || aut.length === 0){
      setAuthorIsValid(false);
      return false;
    }
    else{
      setAuthorIsValid(true);
      return true;
    }
  }
  
  const handleSave = () => {
    // Handle form submission here, e.g., make an API call
    if(nameOnChangeEvent (name.trim()) && authorOnChangeEvent(author)){
      if (!image[0]){
          
        Alert.warning("Select image to be uploaded", 5000);
       return null
      }
      else{
        console.log(updatedImage[0]);
        const formData = new FormData();
        formData.append('id',bookId);
        formData.append('file', updatedImage[0] === undefined ? undefined : updatedImage[0].blobFile);
        formData.append('name',name.trim());
        formData.append('author',author.trim());
        formData.append('language',parseInt(language));
        formData.append('type',type.trim());
        formData.append('series',series.trim());
        formData.append('originalbook',originalBook.trim());
        formData.append('originalauthor',originalAuthor.trim());
        fetch(`${BASE_URL}editbook`, {
            method: 'POST',
            body: formData,
          })
        .then(response => {
          console.log(response);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        }).then(data => {
          console.log(data);
          if(data > 0){
            Alert.success('Successfully updated.', 5000)
            updateTable();
            applyToggle();
          }
        })
        .catch(error => {
        Alert.error(error);
        });
      }
    }
    else{
      Alert.error('Required feild can not be empty.', 5000)
    }
    
  };

    const onFileCheck = (data) => {
      if(data.length > 1){
           Alert.error("You can only upload 1 file at a time", 5000);
      }else{
          if(data.length) {
              let valid = false;
              let filename = data[0].blobFile.name;
              filetype.forEach((type, index) =>{
                  if(filename.includes(type)){
                      valid = true
                  }
              })
              if(valid){
                  if(data[0].blobFile.size > maxFileSize){
                       Alert.error("File Exceeding Max Limit of 8mb", 5000);
                  }else{
                    setUpdatedImage(data);
                  }
              }else{
                   Alert.error("Please upload a correct file extension!", 5000);
              }
          }
        
      }
  }

  const removeUploadedImage = () => {
    setUpdatedImage([]);
  }

  return (
      <Modal 
      backdrop="static"
      keyboard={false}
      overflow={true}
      show={show}
      onHide={applyToggle}
      size="lg"
      style={{padding: "3.0rem"}}>
        <Modal.Header>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{justifyContent: "center",display: "flex"}}>
          <Container fluid>
            <Row style={{marginTop:"1.0rem"}}>
              <Col lg="9" sm="9" md="9">
                <Row style={{marginTop:"1.0rem"}}>
                <Col lg="2" sm="2" md="2"><Label for="exampleEmail">Name</Label><Label style={{color:"red"}}>*</Label></Col>
                <Col lg="10" sm="10" md="10">
                  <Input invalid={!nameIsValid} value={name} type="name" onChange={(e) => nameOnChangeEvent(e.target.value)}/>
                </Col>
                </Row>
              <Row style={{marginTop:"1.0rem"}}>
                <Col lg="2" sm="2" md="2"><Label for="exampleEmail">Author</Label><Label style={{color:"red"}}>*</Label></Col>
                <Col lg="10" sm="10" md="10">
                  <Input invalid={!authorIsValid} value={author} type="name" onChange={(e) => authorOnChangeEvent(e.target.value)}/>
                </Col>
              </Row>
              <Row style={{marginTop:"1.0rem"}}>
                <Col lg="2" sm="2" md="2"><Label for="exampleEmail">Image</Label><Label style={{color:"red"}}>*</Label></Col>
                <Col lg="5" sm="5" md="5">
                <Uploader value={updatedImage}
                          autoUpload={false}
                          onChange={onFileCheck}
                          draggable
                          accept={".png,.jpeg,.jpg"}
                          multiple={false}
                          fileList={updatedImage}
                          onRemove={removeUploadedImage}
                          >
                          <div style={{lineHeight:'2.0rem', border: "1px solid #8898aa"}}>Click or Drag files to this area to upload</div>
                  </Uploader>
                </Col>
                <Col lg="2" sm="2" md="2" style={{textAlign:"end"}}><Label for="exampleEmail">Language</Label></Col>
                <Col lg="3" sm="3" md="3">
                <select className="form-control" value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value={"0"}>Sinhala</option>
                    <option value={"1"}>English</option>
                  </select>
                </Col>
              </Row>
              <Row style={{marginTop:"1.0rem"}}>
                <Col lg="2" sm="2" md="2"><Label for="exampleEmail">Type</Label></Col>
                <Col lg="4" sm="4" md="4">
                  <Input value={type} type="name" onChange={(e) => setType(e.target.value)}/>
                </Col>
                <Col lg="2" sm="2" md="2" style={{textAlign:"end"}}><Label for="exampleEmail">Series</Label></Col>
                <Col lg="4" sm="4" md="4">
                  <Input value={series} type="name" onChange={(e) => setSeries(e.target.value)}/>
                </Col>
              </Row>
              <Row style={{marginTop:"1.0rem"}}>
                <Col lg="2" sm="2" md="2"><Label for="exampleEmail">Original Book</Label></Col>
                <Col lg="4" sm="4" md="4">
                  <Input value={originalBook} type="name" onChange={(e) => setOriginalBook(e.target.value)}/>
                  <FormText>
                    Incase of a transalation
                  </FormText>
                </Col>
                <Col lg="2" sm="2" md="2" style={{textAlign:"end"}}><Label for="exampleEmail">Original Author</Label></Col>
                <Col lg="4" sm="4" md="4">
                  <Input value={originalAuthor} type="name" onChange={(e) => setOriginalAuthor(e.target.value)}/>
                  <FormText>
                    Incase of a transalation
                  </FormText>
                </Col>
              </Row>
              </Col>
              <Col lg="3" sm="3" md="3">
                <Row style={{marginTop:"1.0rem"}}>
                  <img className="edit-book-image" src={`${imagePath}/${bookId}/${image}`} alt="Book Cover" />
                </Row>
              </Col>
            </Row>
            
          </Container>
        </Modal.Body>
        <Modal.Footer style={{textAlign:"center"}}>
          <Button onClick={handleSave} appearance="primary">
            Save
          </Button>
          <Button onClick={applyToggle} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
  );
};

export default EditBook;