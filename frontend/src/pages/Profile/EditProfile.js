import { useContext, useState } from "react"
import { useForm } from 'react-hook-form'
import SessionContext from "../../provider/SessionContext"
import { updateProfile } from "../../util/api/patient"

function EditProfile() {
    const { session, setSession } = useContext(SessionContext)
    // const [userDetails, setUserDetails] = useState({...session?.user})
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues: {...session?.user}});


    const onSubmit = async (data) => {
       let res = await updateProfile(data, session?.authToken, session?.user?._id)

       if(res){
           setSession({...session, user: {...res.user}})
       } else {
           console.log("Not updated")
       }

    }

    return (
        <div>
            <h1>{ session.user.isUpdated ? "Personal details" : "Please complete your profile"}</h1>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                 <div className='inline'>
                    <div>
                        <label htmlFor="firstName">First name</label>
                        <input 
                            type="text"
                            {
                                ...register('firstName', { 
                                    required: true, 
                                    maxLength: 20,
                                    pattern: /^[A-Za-z]+$/i
                                })
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last name</label>
                        <input 
                            type="text"
                            {
                                ...register('lastName', { 
                                    required: true, 
                                    maxLength: 20,
                                    pattern: /^[A-Za-z]+$/i
                                })
                            }
                            />
                    </div>
                    {errors?.firstName?.type === "required" && <p>First name is required.</p>}
                    {errors?.lastName?.type === "required" && <p>Last name is required.</p>}
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        disabled
                        {
                            ...register('email', { 
                                required: true, 
                                
                            })
                        } 
                    />
                </div>
                <div>
                    <label htmlFor="gender">Gender</label>
                    <select {...register("gender", { required: true })}>
                        <option 
                            value="" 
                            defaultValue="Choose your gender" 
                            disabled 
                            hidden
                        > Choose your gender
                        </option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="other">Other</option>
                    </select>
                    {errors?.gender?.type === "required" && <p>This field is required.</p>}
                </div>
                <div>
                    <label htmlFor="telephone">Telephone Number</label>
                    <input 
                        type="tel" 
                        {
                            ...register('telephone', { 
                                required: true, 
                                
                            })
                        } 
                    />
                    {errors?.telephone?.type === "required" && <p>This field is required.</p>}
                </div>
                <div>
                    <label htmlFor="age">Age</label>
                    <input 
                        type="number" 
                        {
                            ...register('age', { 
                                required: true, 
                                min: 1, max: 130
                                
                            })
                        } 
                    />
                    {errors?.age?.type === "required" && <p>This field is required.</p>}
                </div>
                
                <div  className='inline'>
                    <div>
                        <label htmlFor="height">Height</label>
                        <input 
                            type="number" 
                            {
                                ...register('height', { 
                                    required: true, 
                                    min: 1,
                                    
                                })
                            } 
                        />
                        <span>cm</span>
                        {errors?.height?.type === "required" && <p>This field is required.</p>}
                    </div>
                    <div>
                        <label htmlFor="weight">Weight</label>
                        <input 
                            type="number" 
                            {
                                ...register('weight', { 
                                    required: true, 
                                    min: 1
                                })
                            } 
                        />
                        <span>lbs</span>
                        {errors?.weight?.type === "required" && <p>This field is required.</p>}
                    </div>
                </div>
                <div>
                    <label htmlFor="commordities">Commordities</label>
                    <input 
                        type="text" 
                        {
                            ...register('commordities', { 
                                required: true, 
                                maxLength: 200
                            })
                        } 
                    />
                    {errors?.commordities?.type === "required" && <p>This field is required.</p>}
                </div>
                <button type="submit" className="update-btn">Update profile</button>
            </form>
        </div>
    );
}

export default EditProfile;