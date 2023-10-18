import React,{useState,useContext} from 'react';
import { Modal,Button,Alert,Dropdown,Uploader } from 'rsuite';
import { Col, Container, Row,Input,Label,FormText } from "reactstrap";
import { useKeycloak } from "@react-keycloak/web";

const AddBook = ({show, onToggle,updateTable}) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { keycloak } = useKeycloak();
  const [name,setName] = useState('');
  const [author,setAuthor] = useState('');
  const [language,setLanguage] = useState(0);
  const [nameIsValid, setNameIsValid] = useState(false);
  const [authorIsValid, setAuthorIsValid] = useState(false);
  const [type,setType] = useState('');
  const [series,setSeries] = useState('');
  const [image, setImage] = useState([]);
  const [originalBook,setOriginalBook] = useState('');
  const [originalAuthor,setOriginalAuthor] = useState('');

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

  const authorOnChangeEvent = (author) => {
    setAuthor(author);
    if(author === undefined || author.length === 0){
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
          const formData = new FormData();
          formData.append('file', image[0].blobFile);
          formData.append('name',name.trim());
          formData.append('author',author.trim());
          formData.append('language',parseInt(language));
          formData.append('type',type.trim());
          formData.append('series',series.trim());
          formData.append('originalBook',originalBook.trim());
          formData.append('originalAuthor',originalAuthor.trim());
          fetch(`${BASE_URL}addnewbook`, {
              method: 'POST',
              body: formData,
            })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          }).then(data => {
            if(data.length > 0){
              Alert.success('Successfully added book.', 5000)
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

    // const mapStateToProps = state => {
    //   return {
    //     isMenuUpdated = state.isMenuUpdated
    //   }
    // }

    // const mapDispatchToProps = dispatch =>{
    //   return {
    //     menuUpdate:() => dispatch(menuUpdate())
    //   }
    // }

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
                      setImage(data);
                  }
              }else{
                   Alert.error("Please upload a correct file extension!", 5000);
              }
          }
        
      }
  }

  const removeUploadedImage = () => {
    setImage([]);
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
          <Modal.Title>Add Book</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{justifyContent: "center",display: "flex"}}>
          <Container fluid>
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
              <Uploader value={image}
                        autoUpload={false}
                        onChange={onFileCheck}
                        draggable
                        accept={".png,.jpeg,.jpg"}
                        multiple={false}
                        fileList={image}
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
          </Container>
        </Modal.Body>
        <Modal.Footer>
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

export default AddBook;