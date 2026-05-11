import React from 'react'

const Team = () => {
    const supervisor = {
        name: 'Engr. Mustafa Mohiuddin'
    }

    const teamMembers = [
        {
            name: 'Abeer Fatima',
            roll: '22F-BSAI-38',
            photo: '/female-avatar.png'
        },
        {
            name: 'Muhammad Sohaib',
            roll: '22F-BSAI-40',
            photo: '/sohaib.jpg'
        },
        {
            name: 'Muhammad Hammad',
            roll: '22F-BSAI-39',
            photo: '/hammad.jpg'
        },
        {
            name: 'Abdul Basit',
            roll: '22F-BSAI-25',
            photo: '/basit.png'
        }
    ]

    return (
        <section className="section team" id="team">
            <div className="container">
                <div className="section-header">
                    <h2>Team & Credits</h2>
                    <div className="underline"></div>
                    <p>
                        This project was developed by a dedicated team of AI and Data Science students from Dawood
                        University of Engineering and Technology, in collaboration with SUPARCO.
                    </p>
                </div>

                {/* Supervisors Section */}
                <div className="supervisor-section">
                    <div className="supervisors-row">
                        <div className="supervisor-block">
                            <h3 className="supervisor-heading">Supervisor</h3>
                            <div className="supervisor-card">
                                <div className="supervisor-photo">
                                    <img src="/supervisor.png" alt="Engr. Mustafa Mohiuddin" />
                                </div>
                                <h3 className="supervisor-name">{supervisor.name}</h3>
                                <p className="supervisor-roll">Assistant Professor</p>
                                <p className="supervisor-role">Dawood University of Engineering and Technology</p>
                            </div>
                        </div>
                        <div className="supervisor-block">
                            <h3 className="supervisor-heading">SUPARCO Supervisor</h3>
                            <div className="supervisor-card">
                                <div className="supervisor-photo">
                                    <img src="/suparco-supervisor.svg" alt="Abdul Jabbar Lagari" />
                                </div>
                                <h3 className="supervisor-name">Abdul Jabbar Lagari</h3>
                                <p className="supervisor-roll">RESOLVE South,</p>
                                <p className="supervisor-role">SUPARCO Complex, Karachi</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team Members */}
                <div className="team-members-section">
                    <h3 className="team-members-heading">Team Members</h3>
                    <div className="team-grid">
                        {teamMembers.map((member, index) => (
                            <div className="team-card" key={index}>
                                {member.photo ? (
                                    <div className="avatar-photo">
                                        <img src={member.photo} alt={member.name} />
                                    </div>
                                ) : (
                                    <div className="avatar">👤</div>
                                )}
                                <h3>{member.name}</h3>
                                <p className="roll">{member.roll}</p>
                                <p className="role">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Team






