import styled from "styled-components";

export const CardContainer = styled.div`
    position:relative;
    @media (min-width: 1441px) {
        max-width:600px;
        min-width:350px;
        width:30%;
        max-height:450px;
        min-height:270px;
        height:40vh;
  }
  // LAPTOP L
    @media (min-width: 1025px) and (max-width: 1440px) {
        max-width:500px;
        min-width:250px;
        width:30%;
        max-height:400px;
        min-height:270px;
        height:39vh;
  }
    // LAPTOP
    @media (min-width: 769px) and (max-width: 1024px) {
        max-width:600px;
        min-width:150px;
        width:30%;
        max-height:450px;
        min-height:290px;
        height:35vh;
  }
  @media (min-width: 426px) and (max-width: 768px) {
        width:100%;
        height:30%;
        min-height:130px;
        max-height:300px;
       // min-height:290px;
        //margin-bottom:15px;
        justify-content:center;
    }
      @media (max-width: 425px) {
        width:100%;
        height:30%;
        min-height:150px;
        max-height:300px;
       // min-height:290px;
        //margin-bottom:15px;
        justify-content:center;
    }

`

export const FrontCardDiv = styled.div `
    background-color: #2C2D35;
    position:absolute;
    right:0px;
    bottom:0px;
    border-radius:12px;
    border: 1px solid white;
    display:flex;
    flex-direction:column;
    gap:17px;
    z-index:2;
    cursor: pointer;
    @media (min-width: 1441px) {
        width: 90%;
        height: 90%;
        padding: 35px 35px 20px;
    }
    @media (min-width:  1025px) and (max-width: 1440px) {
        width: 90%;
        height: 90%;
        padding: 28px 28px 18px;
        gap:15px;
     }
     @media (min-width: 769px) and (max-width: 1024px) {
        width: 90%;
        height: 90%;
        padding: 20px 20px 16px;
        gap:11%;
  }
  // Tablet
  @media (max-width: 768px) {
        width:100%;
        height: 90%;
        padding:17px;
        gap:8%;
        position:relative;
  }
    `

export const BackCardDiv = styled.div `
    background-color: #2C2D35;
    border-radius:12px;
    border: 1px solid white;
    @media (min-width: 1441px) {
        width: 90%;
        height: 90%;
    }
    @media (min-width: 1025px) and (max-width: 1440px) {
        width: 90%;
        height: 90%;
     }
     @media (min-width: 769px) and (max-width: 1024px) {
        width: 90%;
        height: 90%;
  }
  // Tablet
  @media (max-width: 768px) {
        width: 90%;
        height: 90%;
        display:none;
  }
`

export const Title = styled.h2`
    font-weight:600;
    font-size:20px;
    
    @media (min-width: 1025px) and (max-width: 1440px) { 
        font-size:20px;
    }
    @media (min-width: 769px) and (max-width: 1024px) {
        font-size:15px;
  }
    @media (max-width: 768px) {
        font-size:17px;
  }
`

export const Text = styled.p`
    font-size:15px;
    line-height: 1.8rem;

    @media (min-width: 1025px) and (max-width: 1440px) { 
        font-size:14px;
        line-height: 1.5rem;
    }
    @media (min-width: 769px) and (max-width: 1024px) {
        font-size:11px;
        line-height: 1.4rem;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
  }
  @media (max-width: 768px) {
    font-size:10px;
    line-height: 1.2rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3; 
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }
`

export const Span = styled.span`
    color: #858B95;
    font-weight:600;
    margin-top:auto;
    @media (min-width: 769px) and (max-width: 1024px) {
        font-size:11px;
     }
    @media (max-width: 768px) {
        font-size:13px;
        align-self:flex-end;
     }
`
