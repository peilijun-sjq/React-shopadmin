// import styled from 'styled-components'

// export const DashStyle = styled.div`

//     .gutter-box{
//         height:150px
//         background: #00a0e9;
//         margin: 10px 0;
//         text-align:center
//         line-height:150px
        
//     }
    
// `

import styled from 'styled-components'
export const DashStyle = styled.div`
import {DashStyle} from './style';

#div{
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin: 20px;
    font-size: 20px;
    .div1:hover{
    transition: all .5s;
    transform: rotate(-10deg) scale(1.1);
    box-shadow: 0px 3px 5px rgba(0,0,0,.4);
    } 
    .div2:hover{
    transition: all .5s;
    transform: rotate(-5deg) scale(1.1);
    box-shadow: 0px 3px 5px rgba(0,0,0,.4);
    } 
    .div3:hover{
    transition: all 2s;
    transform:  rotate(720deg) scale(1.2);
    box-shadow: 0px 3px 5px rgba(0,0,0,.4);
    } 
    .div4:hover{
    transition: all .5s;
    transform: rotate(5deg) scale(1.1);
    box-shadow: 0px 3px 5px rgba(0,0,0,.4);
    } 
    .div5:hover{
    transition: all .5s;
    transform: rotate(10deg) scale(1.1);
    box-shadow: 0px 3px 5px rgba(0,0,0,.4);
    } 
     
}
 .div1{
    position: relative; 
    height: 90px;
    width: 200px;
    background-color: red;
    text-align: center;
    border-radius: 20px;
 }
 .div2{
    position: relative; 
    height: 90px;
    width: 200px;
    background-color: gray;
    text-align: center;
    border-radius: 20px;
 }
 .div3{
    position: relative; 
    height: 90px;
    width: 200px;
    background-color: lightblue;
    text-align: center;
    border-radius: 20px;
 }
 .div4{
    position: relative; 
    height: 90px;
    width: 200px;
    background-color: orange;
    text-align: center;
    border-radius: 20px;
 }
 .div5{
    position: relative; 
    height: 90px;
    width: 200px;
    background-color: lightgreen;
    text-align: center;
    border-radius: 20px;
 }



.div1:before,.div1:after,
.div2:before,.div2:after,
.div3:before,.div3:after,
.div4:before,.div4:after,
.div5:before,.div5:after{
  position: absolute;
  content: "";
  left: -5px;
  right: -5px;
  top: -5px;
  bottom: -5px;
  border: 5px solid #FF33FF;
}
.div1:before,
.div2:before,
.div3:before,
.div4:before,
.div5:before{
  animation: move 5s linear infinite normal -2.5s;
}
.div1:after,
.div2:after,
.div3:after,
.div4:after,
.div5:after{
  border-color: #FF33FF;
  animation: move 5s linear infinite;
}
 
@keyframes move{
  0%{
    clip: rect(0,210px,5px,0);
  }
  25%{
    clip: rect(0,210px,100px,205px);
  }
  50%{
    border-color: #00ff0088;
    clip: rect(95px,210px,210px,0);
  }
  75%{
    clip: rect(0,5px,100px,0);
  }
  100%{
    clip: rect(0,210px,5px,0);
  }
}
   
    
`

