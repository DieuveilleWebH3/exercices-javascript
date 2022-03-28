import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form, Table , Button, Card } from 'react-bootstrap';
import "./css.css";

const URL_DB = "http://localhost:3003/appointment";
const dateDebutCalendrier = new Date("December 28, 2000");
const dateFinCalendrier = new Date("January 30, 2040");

export default function Calendrier() {

    const [annees, setAnnees] = useState();
    const [mois, setMois] = useState();
    const [jour, setJour] = useState();

    const [calendrier, setCalendrier] = useState([]);

    const [currentMonth , setCurrentMonth] = useState([]);
    const [dateChoisi, setDateChoisi] = useState();

    const [rdv , setRdv] = useState({
        titre : "",
        commentaire :"",
    });

    const [allRDV, setAllRdv] = useState([]);
    const [rdvDuJourChoisi, setRdvDuJourChoisi] = useState([]);

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
    const nomMois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"
    ];
    const jourDeSemaine = ["Dimanche","Lundi", "Mardi","Mercredi", "Jeudi", "Vendredi", "Samedi"];

    const onChange= (e) =>{
        const {name , value}= e.target ;
        setRdv(prevForm =>{ 
            return  {...prevForm , [name]: value} 
        })
    }
    const prevMonth = () => {
        console.log(mois-1); // Mois précédent 
        if(mois-1 === 0){
            setMois(12);
            setAnnees(annees-1);
        }   
        else setMois(mois-1);
    }
    const nextMonth = () => {
        console.log(mois+1); // Mois suivant
        if(mois+1 === 13){
            setMois(1);
            setAnnees(annees+1);
        }
        else setMois(mois+1);
    }
    const nextYear = () => {
        console.log(annees+1); // Année suivante
        setAnnees(annees+1);
    }
    const prevYear = () => {
        console.log(annees-1); // Année précedente
        setAnnees(annees-1);
    }
    const dayClick = (a) => {
        console.log(a);
        setDateChoisi(a.toLocaleDateString('fr-FR',options));
    }
    const supprimerRdv = (e, rdv) => {
        e.preventDefault();
        axios.delete(URL_DB + `/${rdv.id}`).then(res=> console.log(res));
    }
    const prendreRdv = (e) =>{
        e.preventDefault();
        console.log(dateChoisi);
        console.log(rdv);
        

        // We make sure the title and the date were given
        if( ( ( dateChoisi === '') || ( dateChoisi === undefined ) )  && ( rdv.titre === '' ) ) 
        {
            document.querySelector(".js-errorAdd").innerHTML = "Veuillez choisir une date et rajouter un titre";
            
            return 0
        }

        // We make sure the date was chosen
        if( ( dateChoisi === '') || ( dateChoisi === undefined ) ) 
        {
            document.querySelector(".js-errorAdd").innerHTML = "Veuillez choisir la date";
            
            return 0
        }

        // We make sure the title was given
        if( ( rdv.titre === '') || ( rdv.titre === undefined ) ) 
        {
            document.querySelector(".js-errorAdd").innerHTML = "Veuillez rajouter un titre";
            
            return 0
        }

        let obj = {
            titre : rdv.titre,
            commentaire : rdv.commentaire,
            date : dateChoisi
        }
        axios.post(URL_DB, obj).then(res => console.log(res));
    }
    useEffect(() => {
        const result = calendrier.filter(c => (c.getMonth()) === (mois-1) && c.getFullYear() === annees);
        setCurrentMonth(result);
        setDateChoisi();
    }, [annees,jour,mois]);
    useEffect(() => {
        axios.get(URL_DB+`?date=${dateChoisi}`).then(res => setRdvDuJourChoisi(res.data));
    }, [dateChoisi]);
    useEffect(() => {
        setAllRdv([]);
        const date = new Date();
        setMois(date.getMonth()+1);
        setAnnees(date.getFullYear());
        setJour(date.getDate());
        var r = [];
        while (dateDebutCalendrier <= dateFinCalendrier)
        {
            r.push(new Date(dateDebutCalendrier.setDate(dateDebutCalendrier.getDate() + 1)));
        }
        setCalendrier(r);
        setRdvDuJourChoisi([]);
        axios.get(URL_DB).then(res => setAllRdv(res.data));
    }, []);
    return (
        <div className="content-body">
		    <div className="container-fluid">

                <div className="col-xxl-12 text-center" style={{ textAlign: 'center', margin: 'auto'}}>
                    <div className="row">

                        <div className="col-xl-12 col-lg-12">
                            <div className='row text-center mt-5'>

                                <div className="col-xl-6">
                                    <div className="row text-center">
                                        <div className="d-flex justify-content-center">
                                            <button className='btn btn-dark prev' onClick={()=> prevMonth()}> &lt; </button>    
                                            <b className='mt-2'>{nomMois[mois-1]}</b>
                                            <button className='btn btn-dark next' onClick={() => nextMonth()}> &gt; </button>    
                                        </div>
                                        <div className="mt-2 d-flex justify-content-center">
                                            <button className='btn btn-dark prev' onClick={() => prevYear()}> &lt; </button>    
                                            <b className='mt-2'>{annees}</b>
                                            <button className='btn btn-dark next' onClick={() => nextYear()}> &gt; </button>    
                                        </div>
                                    </div>
                                    <Table bordered>
                                        <thead>
                                            <tr>
                                                {currentMonth.length > 0 && currentMonth.slice(0,7).map(a => {
                                                    return <th scope="col">{jourDeSemaine[a.getDay()]}</th>
                                                })}
                                            </tr>
                                        </thead>
                                        <tbody className='body-table'>
                                                {/* Premiere Semaine */}
                                                <tr> 
                                                {currentMonth.length > 0 && currentMonth.slice(0,7).map(a => {
                                                    const rdvs = allRDV.filter(rdv => rdv.date === a.toLocaleDateString('fr-FR',options));
                                                    if(new Date().toLocaleDateString('fr-FR',options) === a.toLocaleDateString('fr-FR',options)){
                                                        return <td className='col-md-1 item-tab' 
                                                                    key={a} 
                                                                    style={{backgroundColor:'black',color:'white'}}
                                                                    onClick={()=> {
                                                                    dayClick(a);
                                                                    
                                                                }}>
                                                                    {a.getDate()}
                                                                </td>
                                                    }
                                                    if(rdvs.length>0){
                                                        return <td className='col-md-1 item-tab' 
                                                                    key={a} 
                                                                    style={{backgroundColor:'grey'}}
                                                                    onClick={()=> {
                                                                    dayClick(a);
                                                                    
                                                                }}>
                                                                    {a.getDate()}
                                                                </td>
                                                    }else{
                                                        return <td className='col-md-1 item-tab' key={a} onClick={()=> {
                                                            dayClick(a);
                                                        }}>{a.getDate()}</td>
                                                    }
                                                })}
                                                </tr>
                                                <tr> 
                                                {currentMonth.length > 0 && currentMonth.slice(7,14).map(a => {
                                                    const rdvs = allRDV.filter(rdv => rdv.date === a.toLocaleDateString('fr-FR',options));
                                                    if(new Date().toLocaleDateString('fr-FR',options) === a.toLocaleDateString('fr-FR',options)){
                                                        return <td className='col-md-1 item-tab' 
                                                                    key={a} 
                                                                    style={{backgroundColor:'black',color:'white'}}
                                                                    onClick={()=> {
                                                                    dayClick(a);
                                                                    
                                                                }}>
                                                                    {a.getDate()}
                                                                </td>
                                                    }
                                                    if(rdvs.length>0){
                                                        return <td className='col-md-1 item-tab' 
                                                                    key={a} 
                                                                    style={{backgroundColor:'grey'}}
                                                                    onClick={()=> {
                                                                    dayClick(a);
                                                                    
                                                                }}>
                                                                    {a.getDate()}
                                                                </td>
                                                    }else{
                                                        return <td className='col-md-1 item-tab' key={a} onClick={()=> {
                                                            dayClick(a);
                                                        }}>{a.getDate()}</td>
                                                    }
                                                })}
                                                </tr>
                                                <tr> 
                                                {currentMonth.length > 0 && currentMonth.slice(14,21).map(a => {
                                                    const rdvs = allRDV.filter(rdv => rdv.date === a.toLocaleDateString('fr-FR',options));
                                                    if(new Date().toLocaleDateString('fr-FR',options) === a.toLocaleDateString('fr-FR',options)){
                                                        return <td className='col-md-1 item-tab' 
                                                                    key={a} 
                                                                    style={{backgroundColor:'black',color:'white'}}
                                                                    onClick={()=> {
                                                                    dayClick(a);
                                                                    
                                                                }}>
                                                                    {a.getDate()}
                                                                </td>
                                                    }
                                                    if(rdvs.length>0){
                                                        return <td className='col-md-1 item-tab' 
                                                                    key={a} 
                                                                    style={{backgroundColor:'grey'}}
                                                                    onClick={()=> {
                                                                    dayClick(a);
                                                                    
                                                                }}>
                                                                    {a.getDate()}
                                                                </td>
                                                    }else{
                                                        return <td className='col-md-1 item-tab' key={a} onClick={()=> {
                                                            dayClick(a);
                                                        }}>{a.getDate()}</td>
                                                    }
                                                    
                                                })}
                                                </tr>
                                                <tr> 
                                                {currentMonth.length > 0 && currentMonth.slice(21,28).map(a => {
                                                    const rdvs = allRDV.filter(rdv => rdv.date === a.toLocaleDateString('fr-FR',options));
                                                    if(new Date().toLocaleDateString('fr-FR',options) === a.toLocaleDateString('fr-FR',options)){
                                                        return <td className='col-md-1 item-tab' 
                                                                    key={a} 
                                                                    style={{backgroundColor:'black',color:'white'}}
                                                                    onClick={()=> {
                                                                    dayClick(a);
                                                                    
                                                                }}>
                                                                    {a.getDate()}
                                                                </td>
                                                    }
                                                    if(rdvs.length>0){
                                                        
                                                        return <td className='col-md-1 item-tab' 
                                                                    key={a} 
                                                                    style={{backgroundColor:'grey'}}
                                                                    onClick={()=> {
                                                                    dayClick(a);
                                                                    
                                                                }}>
                                                                    {a.getDate()}
                                                                </td>
                                                    }else{
                                                        return <td className='col-md-1 item-tab' key={a} onClick={()=> {
                                                            dayClick(a);
                                                        }}>{a.getDate()}</td>
                                                    }
                                                })}
                                                </tr>
                                                <tr> 
                                                {currentMonth.length > 0 && currentMonth.slice(28,35).map(a => {
                                                    const rdvs = allRDV.filter(rdv => rdv.date === a.toLocaleDateString('fr-FR',options));
                                                    if(rdvs.length>0){
                                                        
                                                        return <td className='col-md-1 item-tab' 
                                                                    key={a} 
                                                                    style={{backgroundColor:'grey'}}
                                                                    onClick={()=> {
                                                                    dayClick(a);
                                                                    
                                                                }}>
                                                                    {a.getDate()}
                                                                </td>
                                                    }else{
                                                        return <td className='col-md-1 item-tab' key={a} onClick={()=> {
                                                            dayClick(a);
                                                        }}>{a.getDate()}</td>
                                                    }
                                                    
                                                })}
                                                </tr>
                                        </tbody>
                                    </Table>
                                </div>
                                <div className='col-xl-6'>
                                    <Form>
                                        <h3>Form</h3>
                                        <Form.Group className="mb-3" controlId="formRDV_titre">
                                            <Form.Control className="text-center" type="text" placeholder="Enter the RDV title" required name="titre" onChange={onChange}/>
                                            <div className='js-errorAdd' style={{ color: 'red' }}></div>
                                        </Form.Group>
                                        <input type="textarea"
                                                row='5'
                                                name="commentaire"
                                                placeholder="Enter your comment"
                                                onChange={onChange}
                                                className='form-control text-center'
                                        />
                                        
                                        <Form.Group className="mb-3 mt-3" controlId="formRDV_date">
                                            <Form.Control className="text-center" type="text" placeholder="Pick a date" name="date" disabled={true} value={dateChoisi}/>
                                        </Form.Group>
                                        <Button variant="success" type="submit" onClick={(e)=> prendreRdv(e)}>
                                            Make an Appointment
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                            <div className="row text-center mt-5">
                                <h4>Appointments</h4>

                                <div className="col-xl-12 col-lg-12">
                                    <div className='row text-center mt-5 mb-2'>
                                    {rdvDuJourChoisi.length>0 && 
                                        rdvDuJourChoisi.map(rdv => {
                                            return <Card style={{ width: '18rem', margin: 'auto' }} className="col-xl-3 ml-3 mb-2">
                                            <Card.Body>
                                                <Card.Title>{rdv.titre}</Card.Title>
                                                <Card.Text>
                                                    {rdv.commentaire}
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                <Card.Text>{rdv.date}</Card.Text>
                                            </Card.Footer>
                                            <Card.Body className='row align-item-center'>
                                                <div className="col-xl-12 col-xxl-12 mr-auto">
                                                    <Button className='btn btn-warning btn-md small'>Modifier</Button> 
                                                
                                                    <div style={{ width: '10px', height:'auto', display: 'inline-block'}}></div>

                                                    <Button className='btn btn-danger btn-md small' onClick={(e)=> supprimerRdv(e,rdv)}>Supprimer</Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                        })
                                    }
                                    </div>

                                </div>

                            </div>
                        </div> 
                    </div>
                </div>
            </div>


            <div style={{ height:'50px'}}></div>


            <div className="text-center footer">
                <div className="text-center copyright">
                    <p>Copyright © Designed &amp; Developed by  Dieuveille BOUSSA ELLENGA</p>
                </div>
            </div>

        </div>

    )
}
