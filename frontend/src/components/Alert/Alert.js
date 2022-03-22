import success from '../../assets/icons/ok.svg'
import './alert.scss'
// import { Transition } from 'react-transition-group';

// const duration = 300;

// const defaultStyle = {
//   transition: `opacity ${duration}ms ease-in-out`,
//   opacity: 0,
// }

// const transitionStyles = {
//   entering: { opacity: 1 },
//   entered:  { opacity: 1 },
//   exiting:  { opacity: 0 },
//   exited:  { opacity: 0 },
// };

export const Alert = () => {
    return (
        <div className="alert-container">
            <div className="alert">
                <img src={success} alt="Ok svg"/>
                <p>Your email has been sent. We will reach out to you shortly.</p>
            </div>
        </div>
    )
}