
import React from 'react'
import UserTabs from '../Components/UserTabs'
import { useState, useEffect } from 'react';
import axios from '../axios';

import cert_img from "../Images/certificate.png"

import { useAuth } from "../Hooks/useAuth";
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFFile from '../Components/PDFFile.js';

const UserDonationHistory = () => {
    const auth = useAuth();
    const [donations, setDonations] = useState([]);

    const userID = auth?.auth?.donor_id;

    useEffect(() => {
        async function fetchData() {
          axios
            .get(`http://localhost:3031/user/getAllDonationsofUser/${userID}`, {
              headers: {
                Authorization: `Bearer ${auth?.auth?.token}`,
              },
            })
            .then((response) => {
              console.log("got all donation history of the user");
              console.log(response.data);
              // const data = await response.json();
              setDonations(response.data);
              console.log(donations);
            })
            .catch((error) => {
              console.error("Error fetching donation data:", error);
            });
        }
        fetchData();
      }, []); // Only run this effect when user_id changes

  return (
    <div className='h-screen'>
    <UserTabs/>
    <div className='bg-[#F2EEDB] flex flex-col items-center justify-center px-6 py-8 mx-auto'>
        <h1 className="font-bold text-4xl">My Donations</h1>
        <div className="w-full mt-5 p-5 bg-[#E3DEC6] rounded-lg shadow h-full">
            <TableHeader/>
            {donations.map((donation, index) => (
                      <TableRow key={index} donation={donation} />
            ))}
        </div>
    </div>
    </div>
  )
}

const TableHeader = () => {
    return (
      <div>
        <div className="grid grid-cols-4 gap-4 font-semibold text-lg pt-5 pb-5">
          <div>Donation Date</div>
          <div>Amount Donated(ml)</div>
          <div>Donation Type</div>
          <div>Certificate</div>
        </div>
      </div>
    );
  };

  
const TableRow = ({ donation }) => {
    return (
      <div>
        <div className="grid grid-cols-4 gap-4 text-md pt-5 pb-5 font-poppins">
          <div>{donation?.dateOfDonation}</div>
          <div>{donation?.amount_Donated}</div>
          <div>{donation?.donation_id}</div>
          <div className="pdf">
            <PDFDownloadLink document={<PDFFile />} filename="FORM">
            {({loading}) => (loading ? <button>Loading Document...</button> : <button>Download</button> )}
            </PDFDownloadLink>
            {/* <PDFFile /> */}
            </div>
          
        </div>
      </div>
    );
  };
  

const PDF = () => {
  return (
    <PDFDownloadLink document={<PDFFile />} fileName="somename.pdf">
      {({ blob, url, loading, error }) =>
        loading ? <button>Loading Document</button> : <button>Download</button>
      }
    </PDFDownloadLink>
  )
  }

export default UserDonationHistory