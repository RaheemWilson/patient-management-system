import success from '../../assets/icons/ok.svg'
import './alert.scss'

export const Alert = () => {
    return (
        <div class="alert-container">
            <div class="alert">
                <img src={success} alt="Ok svg"/>
                <p>Your email has been sent. We will reach out to you shortly.</p>
            </div>
        </div>
    )
}