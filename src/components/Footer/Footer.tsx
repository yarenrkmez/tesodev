/** Dependencies */
import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
/** Style */
import footerImage from '../../assets/images/footer.png';
import './Footer.scss'

type Props = {}
const containerStyle = {
    width: '100%',
    height: '100%'
};

const center = {
    lat: -3.745,
    lng: -38.523
};
const Footer = (props: Props) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCqXvdDfxzEmJDibuIhULFr9lcBjcbsnjk"
    })
    console.log(isLoaded)
    return (
        <div className="footer-container">

            <div className="footer-container__contact-container">
                <img src={footerImage} />
                <div className="footer-container__contact">
                    <span>
                        <b>İletişim</b><br />
                        Adres: Çifte Havuzlar Mah. Eski Londra Asfaltı Cad.
                        Kuluçka Merkezi D2 Blok No: 151/1F İç Kapı No: 2B03 Esenler/İstanbul
                    </span>
                    <span><b>Email: bilgi@tesodev.com</b></span>
                </div>
            </div>
            {isLoaded && <div className="footer-container__map">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                >
                    <></>
                    <Marker position={center} />
                </GoogleMap>
            </div>}
        </div>
    )
}

export default Footer