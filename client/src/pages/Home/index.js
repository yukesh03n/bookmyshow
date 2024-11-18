import React, { useEffect } from 'react'
import { GetCurrentUser } from '../../api/user';
import { message } from 'antd';

export default function Home() {

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const response = await GetCurrentUser();
        if (response.success) {
            message.success(response.message);
        } else {
            message.error(response.message);
        }
    }
    catch (e) {
        console.log(e);
        message.error(e);
    }
    };

    //fetchUser();
  }, [])

  return (
    <div>Home</div>
  )
}
