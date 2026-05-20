CREATE TYPE task_status AS ENUM (
    'PENDING', 
    'IN PROGRESS', 
    'COMPLETED'
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status task_status NOT NULL,
    due_datetime TIMESTAMP NOT NULL
);

INSERT INTO tasks (title, description, status, due_datetime) VALUES 
('Review documents', 'Check submitted documents for completeness', 'COMPLETED', '2026-05-10 09:00:00'),

('Schedule appointment', 'Arrange a meeting based on availability', 'IN PROGRESS', '2026-05-14 14:00:00'),

('Update contact details', 'Ensure records contain current contact information', 'COMPLETED', '2026-05-11 16:30:00'),

('Prepare summary report', 'Create a summary of current case information', 'PENDING', '2026-05-18 12:00:00'),

('Validate submitted data', 'Check data for errors and inconsistencies', 'IN PROGRESS', '2026-05-13 17:00:00'),

('Assign task owner', 'Allocate task to appropriate team member', 'PENDING', '2026-05-16 10:00:00'),

('Close completed task', 'Mark task as completed in the system', 'COMPLETED', '2026-05-09 15:00:00'),

('Follow up missing information', 'Request any missing required details', 'IN PROGRESS', '2026-05-12 11:00:00'),

('Audit records', 'Review records for accuracy and compliance', 'PENDING', '2026-05-19 09:30:00'),

('Prepare weekly overview', 'Summarise work completed during the week', 'PENDING', '2026-05-20 13:00:00');