-- ODC Club Hybride Platform - Database Schema
-- Generated for PostgreSQL

-- Table: countries
CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    continent VARCHAR(50),
    clubs INTEGER DEFAULT 0,
    projects INTEGER DEFAULT 0,
    odciens INTEGER DEFAULT 0,
    admin_status VARCHAR(20) CHECK (admin_status IN ('active', 'inactive', 'pending')),
    last_updated TIMESTAMP,
    admin_name VARCHAR(100),
    admin_email VARCHAR(100)
);

-- Table: regions
CREATE TABLE regions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country_code VARCHAR(10) REFERENCES countries(code),
    admin_name VARCHAR(100),
    admin_email VARCHAR(100),
    admin_status VARCHAR(20),
    admin_last_login TIMESTAMP,
    performance INTEGER
);

-- Table: clubs
CREATE TABLE clubs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country_code VARCHAR(10) REFERENCES countries(code),
    region_id INTEGER REFERENCES regions(id),
    city VARCHAR(100),
    university VARCHAR(150),
    status VARCHAR(20) CHECK (status IN ('pending', 'active', 'archived')),
    team_leader_name VARCHAR(100),
    team_leader_email VARCHAR(100),
    coach_name VARCHAR(100),
    coach_email VARCHAR(100),
    focus_areas TEXT[],
    vision TEXT,
    objectives TEXT,
    expected_support TEXT,
    description TEXT,
    goals TEXT,
    founded VARCHAR(10),
    logo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: users (ODCiens, admins, coaches, etc.)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    role VARCHAR(30) CHECK (
        role IN (
            'super_admin', 'country_admin', 'regional_admin',
            'club_manager', 'expert', 'coach', 'student'
        )
    ),
    country_code VARCHAR(10),
    region_id INTEGER REFERENCES regions(id),
    university VARCHAR(150),
    club_id INTEGER REFERENCES clubs(id),
    admin_level VARCHAR(20),
    is_demo BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: club_memberships
CREATE TABLE club_memberships (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    club_id INTEGER REFERENCES clubs(id),
    role_in_club VARCHAR(30) CHECK (
        role_in_club IN ('member', 'coach', 'manager', 'developer', 'designer', 'business')
    ),
    status VARCHAR(20) CHECK (status IN ('active', 'pending', 'inactive')),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: projects
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    club_id INTEGER REFERENCES clubs(id),
    status VARCHAR(30) CHECK (
        status IN ('idea', 'prototype', 'submitted', 'shortlisted', 'finalist', 'completed')
    ),
    theme_tags TEXT[],
    mentor_id INTEGER REFERENCES users(id),
    next_deadline DATE,
    submitted_to INTEGER[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: competitions
CREATE TABLE competitions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    deadline DATE,
    start_date DATE,
    submissions INTEGER DEFAULT 0,
    participants INTEGER DEFAULT 0,
    countries TEXT[],
    status VARCHAR(20) CHECK (status IN ('active', 'judging', 'closed')),
    phase VARCHAR(20) CHECK (phase IN ('Registration', 'Submission', 'Judging', 'Completed')),
    jury_status VARCHAR(20) CHECK (jury_status IN ('Assigned', 'Pending')),
    judge_count INTEGER DEFAULT 0,
    winners_announced BOOLEAN DEFAULT FALSE,
    prizes VARCHAR(100)
);

-- Table: events
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    date DATE,
    end_date DATE,
    time VARCHAR(20),
    location VARCHAR(150),
    city VARCHAR(100),
    type VARCHAR(30),
    status VARCHAR(20),
    priority VARCHAR(20),
    category VARCHAR(50),
    organizer VARCHAR(100),
    expected_attendees INTEGER,
    registered_attendees INTEGER,
    budget INTEGER,
    spent_budget INTEGER,
    club_id INTEGER REFERENCES clubs(id),
    regions INTEGER[],
    tags TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: registrations/applications
CREATE TABLE registrations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    club_id INTEGER REFERENCES clubs(id),
    region_id INTEGER REFERENCES regions(id),
    type VARCHAR(30),
    status VARCHAR(20) CHECK (status IN ('pending', 'approved', 'rejected', 'interview', 'waitlist')),
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP,
    motivation TEXT,
    experience TEXT,
    references TEXT[]
);

-- Table: focus_areas (normalized)
CREATE TABLE focus_areas (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE club_focus_areas (
    club_id INTEGER REFERENCES clubs(id),
    focus_area_id INTEGER REFERENCES focus_areas(id),
    PRIMARY KEY (club_id, focus_area_id)
);

-- Analytics tables (optional, for reporting)
CREATE TABLE analytics_clubs_growth (
    month VARCHAR(20),
    clubs INTEGER,
    growth DECIMAL(5,2)
);

CREATE TABLE analytics_projects_by_country (
    country VARCHAR(100),
    projects INTEGER,
    completed INTEGER,
    active INTEGER
); 