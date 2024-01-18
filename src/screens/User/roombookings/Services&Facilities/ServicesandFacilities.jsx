import React, { useEffect } from 'react';
import service from '../../../../assets/service.jpeg';
import './ServicesandFacilities.css';
function ServicesandFacilities() {
  return (
    <>
      <div className="room_book_card_form_main">
        <p>Services & Facilities</p>
      </div>
      <div className="service_img_div_main">
        <div className="add_marg_text_weight">
          <p className="add_marg_text">
            Shri Mahaveer Ji has been delightfully decorated to help you feel
            <br />
            the warmth of a home in its comfortable atmosphere. Tastefully
            <br />
            designed and elegantly appointed rooms, having their own individual
            <br />
            character and furnishings, embody the finest of Rajasthan, offering
            <br />
            high levels of comfort coupled with our personalized services.
          </p>
          <p>
            {' '}
            Welcome aboard to the exotic attraction of a heritage Rajasthan
            <br />
            while enjoying luxury of modern amenities. Shri Mahaveer Ji offers a
            <br />
            wide range of personalized services and facilities to help make your
            <br />
            stay in Rajasthan, India a memorable one.
          </p>
        </div>
        <div className="service_img_div_main_img">
          <img src={service} alt="srvice" />
        </div>
      </div>
      <div className="extra_text_div">
        <p className="headInf_text">Peace of Mind</p>
        <li className="add_mb_text">
          Ayurvedic Dispensary –
          <span className="headInf_text_weight">
            The Managing Committee is running an Ayurvedic Dispensary and
            Rasayanshala since 1930. Nearly 50,000 residents of neighbouring
            villages are being benefited every year from the treatment provided.
          </span>
        </li>

        <li className="add_mb_text">
          Shri Mahaveer Yoga-Prakratik Chikitsa and Research Institute –
          <span className="headInf_text_weight">
            The Managing Committee started a Naturopathy Hospital in the year
            1986 and today this 55 bedded hospital is one of the leading
            naturopathy hospitals in Northern-India.
          </span>
        </li>

        <li className="add_mb_text">
          Hospital and Maternity Center –
          <span className="headInf_text_weight">
            To provide Allopathic treatment and maternity facilities to the
            villagers Smt. Chandrawali Siddhomal Jain Hospital and Maternity
            Centre was started by the committee in the year 1996 and further
            expanded in the year 2003. This 40 bedded hospital is equipped with
            Operation Theatre, Labour Room, Sonography, X-ray and Pathological
            investigation facilities.
          </span>
        </li>
      </div>

      <div className="extra_text_div">
        <p className="headInf_text">Educational Facilities :</p>
        <li className="add_mb_text">
          Jain Vidhya Sansthan
          <span className="headInf_text_weight">
            was established in the year 1946 for encouraging research in Jain
            Religion, Philosophy and Culture. To acquaint people with Jain
            religion, Philosophy and culture, correspondence courses are
            conducted by the Sansthan. A number of books are published every
            year by the Sansthan.
          </span>
        </li>

        <li className="add_mb_text">
          Apbhransh Sahitya Academy –
          <span className="headInf_text_weight">
            established in 1988 runs correspondence courses in Prakrat and
            Apbhransha for teaching these two languages.
          </span>
        </li>

        <li className="add_mb_text">
          Pandulipi Sanrakshan Kendra –
          <span className="headInf_text_weight">
            has been developed as a major centre for preservation and
            restoration of our invaluable old granthas(hand-written
            manuscripts).
          </span>
        </li>
        <li className="add_mb_text">
          A Middle School–
          <span className="headInf_text_weight">
            is also run by the Committee near Shri Mahaveerji Railway Station
            for the benefit of local people.
          </span>
        </li>
        <li className="add_mb_text">
          A Museum of Jain Art and Culture –
          <span className="headInf_text_weight">
            is being developed at Shri Mahaveerji.
          </span>
        </li>
      </div>
    </>
  );
}

export default ServicesandFacilities;
