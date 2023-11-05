import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import { Livre } from '../types';

interface IDetailProps {
    author: string,
    id: string
}

export async function loader({ params }: any) {
    const response = await fetch(`/api/document/${params.author}/${params.id}`);
    const livre = await response.json();
    return { livre };
  }

const Detail = () => {
    const { id, author } = useLoaderData() as Livre ;
    return(
        <div>
            <h1>Detail: { id }</h1>
        </div>
    )
}

export default Detail;