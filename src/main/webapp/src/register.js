import React from "react";

import axios from "axios";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password2: "",
      forename: "",
      surname: "",
      streetAddress: "",
      town: "",
      city: "",
      country: "IE",
      phoneNumber: "",
      emailAddress: "",
      gender: "MALE",
      studentNumber: ""
    };
  }

  handleClick(event) {
    event.preventDefault();

    if (this.state.password !== this.state.password2) {
      alert("Passwords do not match");
      return false;
    }

    if (
      !/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/.test(this.state.password)
    ) {
      alert(
        "Password is too weak. Requires 1 capital letter, 1 special character, 1 number and must be at least 8 characters long."
      );
      return false;
    }

    let payload = {
      username: this.state.studentNumber,
      forename: this.state.forename,
      surname: this.state.surname,
      emailAddress: this.state.emailAddress,
      studentNumber: this.state.studentNumber,
      phoneNumber: this.state.phoneNumber,
      password: this.state.password,
      address:
        this.state.streetAddress +
        ", " +
        this.state.town +
        ", " +
        this.state.city +
        ", " +
        this.state.country,
      nationality: this.state.country,
      gender: this.state.gender
    };
    axios
      .post("/api/auth/register/student", payload)
      .then(function(response) {
        if (response.status === 200) {
          window.location.replace("/login");
        }
        // else if(response.data.code == 204){
        //     console.log("Username password do not match");
        //     alert("username password do not match")
        // }
        // else{
        //     console.log("Username does not exists");
        //     alert("Username does not exist");
        // }
      })
      .catch(function(error) {
        alert("Oops. Something went wrong. Please ensure that you have not already registerd with this email or student number.");
        console.log("error:", error);
      });
  }

  render() {
    return (
      <div className="login-reg-bg">
        <div id="register-area">
          <div id="header-links">
            <h1 className="title is-2 is-centered">
              University of Springfield
            </h1>
            <div className="buttons has-addons is-centered">
              <a className="button register-log-button" href="/login">
                Login
              </a>
            </div>
          </div>
          <div id="form-area">
            <form onSubmit={event => this.handleClick(event)}>
              <h1 className="title">Register</h1>
              <div className="form-group-elements">
                <div className="field">
                  <label className="label is-small">First Name</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input is-small"
                      type="text"
                      name="firstName"
                      required
                      onChange={e =>
                        this.setState({
                          forename: e.target.value
                        })
                      }
                    />
                    <span className="icon is-small is-left">
                      <i className="material-icons-outlined">brush</i>
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label className="label is-small">Surname</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input is-small"
                      type="text"
                      name="sureName"
                      required
                      onChange={e =>
                        this.setState({
                          surname: e.target.value
                        })
                      }
                    />
                    <span className="icon is-small is-left">
                      <i className="material-icons">edit</i>
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label className="label is-small">Gender</label>
                  <div className="control has-icons-left has-icons-right">
                    <div className="select is-small">
                      <select
                        name="gender"
                        value={this.state.gender}
                        onChange={e =>
                          this.setState({
                            gender: e.target.value
                          })
                        }
                      >
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>
                    <span className="icon is-small is-left">
                      <i className="material-icons">edit</i>
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label className="label is-small">Student Number</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input is-small"
                      type="number"
                      name="studentNumber"
                      minLength="8"
                      required
                      onChange={e =>
                        this.setState({
                          studentNumber: e.target.value
                        })
                      }
                    />
                    <span className="icon is-small is-left">
                      <i className="material-icons-outlined">person</i>
                    </span>
                  </div>
                </div>
              </div>

              <div className="form-group-elements">
                <div className="field">
                  <label className="label is-small">Email</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input is-small"
                      type="email"
                      name="emailAddress"
                      required
                      onChange={e =>
                        this.setState({
                          emailAddress: e.target.value
                        })
                      }
                    />
                    <span className="icon is-small is-left">
                      <i className="material-icons-outlined">email</i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check" />
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label className="label is-small">Password</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input is-small"
                      type="password"
                      name="password"
                      minLength="8"
                      required
                      onChange={e =>
                        this.setState({ password: e.target.value })
                      }
                    />
                    <span className="icon is-small is-left">
                      <i className="material-icons-outlined">lock</i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check" />
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label className="label is-small">Re-enter Password</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input is-small"
                      type="password"
                      name="password"
                      minLength="8"
                      required
                      onChange={e =>
                        this.setState({ password2: e.target.value })
                      }
                    />
                    <span className="icon is-small is-left">
                      <i className="material-icons-outlined">lock</i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check" />
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label className="label is-small">Phone Number</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input is-small"
                      type="number"
                      name="phoneNumber"
                      required
                      onChange={e =>
                        this.setState({
                          phoneNumber: e.target.value
                        })
                      }
                    />
                    <span className="icon is-small is-left">
                      <i className="material-icons-outlined">phone</i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="form-group-elements" id="register-address">
                <div id="address-boxes">
                  <div className="field">
                    <label className="label is-small">Street Address</label>
                    <div className="control has-icons-left has-icons-right">
                      <input
                        className="input is-small"
                        type="text"
                        name="streetAddress"
                        required
                        onChange={e =>
                          this.setState({
                            streetAddress: e.target.value
                          })
                        }
                      />
                      <span className="icon is-small is-left">
                        <i className="material-icons-outlined">location_on</i>
                      </span>
                    </div>
                  </div>

                  <div className="field">
                    <label className="label is-small">Town</label>
                    <div className="control has-icons-left has-icons-right">
                      <input
                        className="input is-small"
                        type="text"
                        name="town"
                        required
                        onChange={e =>
                          this.setState({
                            town: e.target.value
                          })
                        }
                      />
                      <span className="icon is-small is-left">
                        <i className="material-icons">domain</i>
                      </span>
                    </div>
                  </div>

                  <div className="field">
                    <label className="label is-small">City</label>
                    <div className="control has-icons-left has-icons-right">
                      <input
                        className="input is-small"
                        type="text"
                        name="city"
                        required
                        onChange={e =>
                          this.setState({
                            city: e.target.value
                          })
                        }
                      />
                      <span className="icon is-small is-left">
                        <i className="material-icons">location_city</i>
                      </span>
                    </div>
                  </div>

                  <div className="field">
                    <label className="label is-small">Country</label>
                    <div className="control has-icons-left has-icons-right">
                      <div className="select is-small">
                        <select
                          name="country"
                          required
                          value={this.state.country}
                          onChange={e =>
                            this.setState({
                              country: e.target.value
                            })
                          }
                        >
                          <option value="AF">Afghanistan</option>
                          <option value="AX">Åland Islands</option>
                          <option value="AL">Albania</option>
                          <option value="DZ">Algeria</option>
                          <option value="AS">American Samoa</option>
                          <option value="AD">Andorra</option>
                          <option value="AO">Angola</option>
                          <option value="AI">Anguilla</option>
                          <option value="AQ">Antarctica</option>
                          <option value="AG">Antigua and Barbuda</option>
                          <option value="AR">Argentina</option>
                          <option value="AM">Armenia</option>
                          <option value="AW">Aruba</option>
                          <option value="AU">Australia</option>
                          <option value="AT">Austria</option>
                          <option value="AZ">Azerbaijan</option>
                          <option value="BS">Bahamas</option>
                          <option value="BH">Bahrain</option>
                          <option value="BD">Bangladesh</option>
                          <option value="BB">Barbados</option>
                          <option value="BY">Belarus</option>
                          <option value="BE">Belgium</option>
                          <option value="BZ">Belize</option>
                          <option value="BJ">Benin</option>
                          <option value="BM">Bermuda</option>
                          <option value="BT">Bhutan</option>
                          <option value="BO">
                            Bolivia, Plurinational State of
                          </option>
                          <option value="BQ">
                            Bonaire, Sint Eustatius and Saba
                          </option>
                          <option value="BA">Bosnia and Herzegovina</option>
                          <option value="BW">Botswana</option>
                          <option value="BV">Bouvet Island</option>
                          <option value="BR">Brazil</option>
                          <option value="IO">
                            British Indian Ocean Territory
                          </option>
                          <option value="BN">Brunei Darussalam</option>
                          <option value="BG">Bulgaria</option>
                          <option value="BF">Burkina Faso</option>
                          <option value="BI">Burundi</option>
                          <option value="KH">Cambodia</option>
                          <option value="CM">Cameroon</option>
                          <option value="CA">Canada</option>
                          <option value="CV">Cape Verde</option>
                          <option value="KY">Cayman Islands</option>
                          <option value="CF">Central African Republic</option>
                          <option value="TD">Chad</option>
                          <option value="CL">Chile</option>
                          <option value="CN">China</option>
                          <option value="CX">Christmas Island</option>
                          <option value="CC">Cocos (Keeling) Islands</option>
                          <option value="CO">Colombia</option>
                          <option value="KM">Comoros</option>
                          <option value="CG">Congo</option>
                          <option value="CD">
                            Congo, the Democratic Republic of the
                          </option>
                          <option value="CK">Cook Islands</option>
                          <option value="CR">Costa Rica</option>
                          <option value="CI">Côte d'Ivoire</option>
                          <option value="HR">Croatia</option>
                          <option value="CU">Cuba</option>
                          <option value="CW">Curaçao</option>
                          <option value="CY">Cyprus</option>
                          <option value="CZ">Czech Republic</option>
                          <option value="DK">Denmark</option>
                          <option value="DJ">Djibouti</option>
                          <option value="DM">Dominica</option>
                          <option value="DO">Dominican Republic</option>
                          <option value="EC">Ecuador</option>
                          <option value="EG">Egypt</option>
                          <option value="SV">El Salvador</option>
                          <option value="GQ">Equatorial Guinea</option>
                          <option value="ER">Eritrea</option>
                          <option value="EE">Estonia</option>
                          <option value="ET">Ethiopia</option>
                          <option value="FK">
                            Falkland Islands (Malvinas)
                          </option>
                          <option value="FO">Faroe Islands</option>
                          <option value="FJ">Fiji</option>
                          <option value="FI">Finland</option>
                          <option value="FR">France</option>
                          <option value="GF">French Guiana</option>
                          <option value="PF">French Polynesia</option>
                          <option value="TF">
                            French Southern Territories
                          </option>
                          <option value="GA">Gabon</option>
                          <option value="GM">Gambia</option>
                          <option value="GE">Georgia</option>
                          <option value="DE">Germany</option>
                          <option value="GH">Ghana</option>
                          <option value="GI">Gibraltar</option>
                          <option value="GR">Greece</option>
                          <option value="GL">Greenland</option>
                          <option value="GD">Grenada</option>
                          <option value="GP">Guadeloupe</option>
                          <option value="GU">Guam</option>
                          <option value="GT">Guatemala</option>
                          <option value="GG">Guernsey</option>
                          <option value="GN">Guinea</option>
                          <option value="GW">Guinea-Bissau</option>
                          <option value="GY">Guyana</option>
                          <option value="HT">Haiti</option>
                          <option value="HM">
                            Heard Island and McDonald Islands
                          </option>
                          <option value="VA">
                            Holy See (Vatican City State)
                          </option>
                          <option value="HN">Honduras</option>
                          <option value="HK">Hong Kong</option>
                          <option value="HU">Hungary</option>
                          <option value="IS">Iceland</option>
                          <option value="IN">India</option>
                          <option value="ID">Indonesia</option>
                          <option value="IR">Iran, Islamic Republic of</option>
                          <option value="IQ">Iraq</option>
                          <option value="IE" selected>
                            Ireland
                          </option>
                          <option value="IM">Isle of Man</option>
                          <option value="IL">Israel</option>
                          <option value="IT">Italy</option>
                          <option value="JM">Jamaica</option>
                          <option value="JP">Japan</option>
                          <option value="JE">Jersey</option>
                          <option value="JO">Jordan</option>
                          <option value="KZ">Kazakhstan</option>
                          <option value="KE">Kenya</option>
                          <option value="KI">Kiribati</option>
                          <option value="KP">
                            Korea, Democratic People's Republic of
                          </option>
                          <option value="KR">Korea, Republic of</option>
                          <option value="KW">Kuwait</option>
                          <option value="KG">Kyrgyzstan</option>
                          <option value="LA">
                            Lao People's Democratic Republic
                          </option>
                          <option value="LV">Latvia</option>
                          <option value="LB">Lebanon</option>
                          <option value="LS">Lesotho</option>
                          <option value="LR">Liberia</option>
                          <option value="LY">Libya</option>
                          <option value="LI">Liechtenstein</option>
                          <option value="LT">Lithuania</option>
                          <option value="LU">Luxembourg</option>
                          <option value="MO">Macao</option>
                          <option value="MK">
                            Macedonia, the former Yugoslav Republic of
                          </option>
                          <option value="MG">Madagascar</option>
                          <option value="MW">Malawi</option>
                          <option value="MY">Malaysia</option>
                          <option value="MV">Maldives</option>
                          <option value="ML">Mali</option>
                          <option value="MT">Malta</option>
                          <option value="MH">Marshall Islands</option>
                          <option value="MQ">Martinique</option>
                          <option value="MR">Mauritania</option>
                          <option value="MU">Mauritius</option>
                          <option value="YT">Mayotte</option>
                          <option value="MX">Mexico</option>
                          <option value="FM">
                            Micronesia, Federated States of
                          </option>
                          <option value="MD">Moldova, Republic of</option>
                          <option value="MC">Monaco</option>
                          <option value="MN">Mongolia</option>
                          <option value="ME">Montenegro</option>
                          <option value="MS">Montserrat</option>
                          <option value="MA">Morocco</option>
                          <option value="MZ">Mozambique</option>
                          <option value="MM">Myanmar</option>
                          <option value="NA">Namibia</option>
                          <option value="NR">Nauru</option>
                          <option value="NP">Nepal</option>
                          <option value="NL">Netherlands</option>
                          <option value="NC">New Caledonia</option>
                          <option value="NZ">New Zealand</option>
                          <option value="NI">Nicaragua</option>
                          <option value="NE">Niger</option>
                          <option value="NG">Nigeria</option>
                          <option value="NU">Niue</option>
                          <option value="NF">Norfolk Island</option>
                          <option value="MP">Northern Mariana Islands</option>
                          <option value="NO">Norway</option>
                          <option value="OM">Oman</option>
                          <option value="PK">Pakistan</option>
                          <option value="PW">Palau</option>
                          <option value="PS">
                            Palestinian Territory, Occupied
                          </option>
                          <option value="PA">Panama</option>
                          <option value="PG">Papua New Guinea</option>
                          <option value="PY">Paraguay</option>
                          <option value="PE">Peru</option>
                          <option value="PH">Philippines</option>
                          <option value="PN">Pitcairn</option>
                          <option value="PL">Poland</option>
                          <option value="PT">Portugal</option>
                          <option value="PR">Puerto Rico</option>
                          <option value="QA">Qatar</option>
                          <option value="RE">Réunion</option>
                          <option value="RO">Romania</option>
                          <option value="RU">Russian Federation</option>
                          <option value="RW">Rwanda</option>
                          <option value="BL">Saint Barthélemy</option>
                          <option value="SH">
                            Saint Helena, Ascension and Tristan da Cunha
                          </option>
                          <option value="KN">Saint Kitts and Nevis</option>
                          <option value="LC">Saint Lucia</option>
                          <option value="MF">Saint Martin (French part)</option>
                          <option value="PM">Saint Pierre and Miquelon</option>
                          <option value="VC">
                            Saint Vincent and the Grenadines
                          </option>
                          <option value="WS">Samoa</option>
                          <option value="SM">San Marino</option>
                          <option value="ST">Sao Tome and Principe</option>
                          <option value="SA">Saudi Arabia</option>
                          <option value="SN">Senegal</option>
                          <option value="RS">Serbia</option>
                          <option value="SC">Seychelles</option>
                          <option value="SL">Sierra Leone</option>
                          <option value="SG">Singapore</option>
                          <option value="SX">Sint Maarten (Dutch part)</option>
                          <option value="SK">Slovakia</option>
                          <option value="SI">Slovenia</option>
                          <option value="SB">Solomon Islands</option>
                          <option value="SO">Somalia</option>
                          <option value="ZA">South Africa</option>
                          <option value="GS">
                            South Georgia and the South Sandwich Islands
                          </option>
                          <option value="SS">South Sudan</option>
                          <option value="ES">Spain</option>
                          <option value="LK">Sri Lanka</option>
                          <option value="SD">Sudan</option>
                          <option value="SR">Suriname</option>
                          <option value="SJ">Svalbard and Jan Mayen</option>
                          <option value="SZ">Swaziland</option>
                          <option value="SE">Sweden</option>
                          <option value="CH">Switzerland</option>
                          <option value="SY">Syrian Arab Republic</option>
                          <option value="TW">Taiwan, Province of China</option>
                          <option value="TJ">Tajikistan</option>
                          <option value="TZ">
                            Tanzania, United Republic of
                          </option>
                          <option value="TH">Thailand</option>
                          <option value="TL">Timor-Leste</option>
                          <option value="TG">Togo</option>
                          <option value="TK">Tokelau</option>
                          <option value="TO">Tonga</option>
                          <option value="TT">Trinidad and Tobago</option>
                          <option value="TN">Tunisia</option>
                          <option value="TR">Turkey</option>
                          <option value="TM">Turkmenistan</option>
                          <option value="TC">Turks and Caicos Islands</option>
                          <option value="TV">Tuvalu</option>
                          <option value="UG">Uganda</option>
                          <option value="UA">Ukraine</option>
                          <option value="AE">United Arab Emirates</option>
                          <option value="GB">United Kingdom</option>
                          <option value="US">United States</option>
                          <option value="UM">
                            United States Minor Outlying Islands
                          </option>
                          <option value="UY">Uruguay</option>
                          <option value="UZ">Uzbekistan</option>
                          <option value="VU">Vanuatu</option>
                          <option value="VE">
                            Venezuela, Bolivarian Republic of
                          </option>
                          <option value="VN">Viet Nam</option>
                          <option value="VG">Virgin Islands, British</option>
                          <option value="VI">Virgin Islands, U.S.</option>
                          <option value="WF">Wallis and Futuna</option>
                          <option value="EH">Western Sahara</option>
                          <option value="YE">Yemen</option>
                          <option value="ZM">Zambia</option>
                          <option value="ZW">Zimbabwe</option>
                        </select>
                      </div>
                      <span className="icon is-small is-left">
                        <i className="fas fa-globe" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="field form-group-elements">
                <button className="button is-primary is-small" type="submit">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
