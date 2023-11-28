import NavBar from "../General/NavBar";
import { Stack } from "@mui/material";
import UserCard from "./UserCard";
import { useState, useEffect } from "react";
import { getAllUsersApi } from "../../_apis/api";
import { User } from "../../_apis/apiTypes";

const HomePage = () => {

    const [allUsers, setAllUsers] = useState<User[]>([])

    // TODOTAB: These types need to be fixed
    // The API type should have a wrapper at least
    // Look into axios props
    useEffect(() => {
        getAllUsersApi().then(({ data }) => {
            console.log(data)
            setAllUsers(data.data)
        }).catch(err => console.log(err))

    }, []);


    return (
        <Stack>
            <NavBar />
            {/* TODOTAB: This needs min width and also responsiveness */}
            <Stack direction='row' gap={2} sx={{ padding: 2 }}>
                {
                    allUsers?.map(item => (
                        <UserCard key={item.id} id={item.id} name={item.username} description={item.description ?? ''} />
                    ))
                }
            </Stack>
        </Stack>
    )
}

export default HomePage;