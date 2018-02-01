import React from 'react';

class App extends React.Component {
	constructor() {
      super();
	   this.state = {
         data: 
         [
				{
				   "question":" 1 Number of apps in the environment",
				   "questionDesc":"Please estimate the number of apps in your environment that are candidates for Docker",
				   "option" : "textbox",
				   
				},
				{
				   "question":"2 Deployment Frequency",
				   "questionDesc":"On average, how often does your organization release software in a month, per application?",
				    "option" : "radio",
				},
				{
				   "question":"3 Current number of servers",
				   "questionDesc":"What is the current total number of servers deployed supporting the apps which are being considered for Docker?",
				},
				{
				   "question":"4 Desired infrastructure for Docker?",
				   "questionDesc":"Please indicate the type of infrastructure on which you plan to deploy the Docker environment, either virtual machines (VMs) or Bare Metal machines (Baremetal is available only when Cloud migration = 0%).",
				},
				{
				   "question":"5 Cloud Migration",
				   "questionDesc":"Please indicate the desired percentage of workloads that will move to a public cloud like AWS, Azure, if applicable.",
				  
				},
				{
				   "question":"6 Cloud Migration",
				   "questionDesc":"Please indicate the desired percentage of workloads that will move to a public cloud like AWS, Azure, if applicable.",
				}
	     ],
		 landingPage :[
			{
				   "question":" Name of the Organization",
				   "option" : "textbox",
			},
			{
				   "question":" Registered office address",
				   "option" : "textbox",
			},
			{
				   "question":" Website if any",
				   "option" : "textbox",
			},
			{
				   "question":" Primary Contact E-mail",
				   "option" : "textbox",
			},
			{
				   "question":" Secondary Contact E-mail",
				   "option" : "textbox",
			},
			{
				   "question":" Primary Contact Phone No",
				   "option" : "textbox",
			},
			{
				   "question":" Secondary Contact Phone No",
				   "option" : "textbox",
			},
			{
				   "question":" Secondary Contact Phone No",
				   "option" : "radio",
			},
			
		 ]
		 
      }
   }
   render() {
    const divStyle = {
		  margin: '40px',
		};
	const container = {
		 margin: '100px',
	}
      return (
		<div style={container}>
            <Header/>
			 <table className="responsive-table">
               <tbody className="questionStyle" style={divStyle} >
                  {this.state.landingPage.map((section, i) => <TableRow key = {i} dataObj = {section} />)}
				</tbody>
            </table>
         </div>
      );
   }
}
class Header extends React.Component {
   render() {
   const headerStyle = {
	backgroundColor: '#e7e8e9',
    padding: '30px 24px 25px',
    position: 'relative',
	margin: '25px 0px',
		textAlign: 'center'
   }
   const headerText = {
   fontSize: '28px',
    margin: '0',
   }
      return (
         <div style={headerStyle}>
            <h3 style={headerText}>Please fill the below details for start the Questionnaire</h3>
         </div>
      );
   }
}
class TableRow extends React.Component {
   render() {
   
		
		const qStyle = {
			fontSize: '1.4rem',
			fontWeight:'500',
			margin: '0 0 20px',
			color:'#404b51',
			fontFamily:'sans-serif',
		};
			const qdStyle = {	
				fontSize: '1rem',
				fontWeight:'400',
				lineHeight:'1.63',
				margin: '0 0 20px',
				color:'#70787d',
				fontFamily:'sans-serif',
		};
		const rowStyle = { 
			
		}
      return (
	  
		<tr style={rowStyle}>
            <td><div className="que" style={qStyle}>{this.props.dataObj.question} : </div></td>
            <td>{this.props.dataObj.option == "textbox" ? <input className = "textBox" type="text"/> : null }
			{this.props.dataObj.option == "radio" ? <input type="radio"/> : null }</td>
         </tr>

      );
   }
}
export default App;