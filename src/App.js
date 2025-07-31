import React, { useState, useEffect, useCallback } from 'react';

// --- MOCK ICONS (using emojis for web) ---
const Icon = ({ name, size = 24, color = '#000' }) => {
    const icons = {
        home: '🏠',
        people: '👥',
        cloud: '☁️',
        settings: '⚙️',
        airplane: '✈️',
        ai: '🧠',
        camera: '📷',
        chart: '📊',
        edit: '✏️',
        computer: '�',
        wrench: '🔧',
        building: '🏗️',
        bolt: '⚡',
        satellite: '📡',
        flask: '🧪',
        heart: '❤️',
        car: '🚗',
        user: '👤',
        id: '🆔',
        briefcase: '💼',
        download: '📥',
    };
    return <span style={{ fontSize: size, color }}>{icons[name] || '❓'}</span>;
};

// --- CUSTOM HEADER COMPONENT ---
const WaveHeader = ({ title }) => (
    <div style={styles.headerContainer}>
        <svg height="100%" width="100%" style={{ position: 'absolute', top: 0, left: 0 }} viewBox="0 0 400 180" preserveAspectRatio="none">
            <path
                d="M0,0 L0,130 Q100,180 200,130 T400,140 L400,0 Z"
                fill="#8e44ad"
            />
        </svg>
        <p style={styles.headerTitle}>{title}</p>
    </div>
);


// --- SCREENS ---

// 1. Login/Register Screen
const AuthScreen = ({ navigate, setUserProfile }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        employeeId: '',
        department: 'Aeronautical Engineering',
        role: 'Staff'
    });

    const departments = [
        'Aeronautical Engineering', 'Artificial Intelligence & Data Science', 'Computer Science & Engineering',
        'Mechanical Engineering', 'Civil Engineering', 'Electrical & Electronics Engineering',
        'Electronics & Communication Engineering', 'Information Technology', 'Chemical Engineering',
        'Biomedical Engineering', 'Mechatronics', 'Automobile Engineering', 'Biotechnology'
    ];
    
    const handleInputChange = (field, value) => {
        setFormData(prev => ({...prev, [field]: value}));
    };

    const handleAuthAction = () => {
        // In a real app, you'd have actual authentication logic here.
        // For this demo, we'll just set the user profile based on the form.
        setUserProfile({
            name: formData.fullName || 'Test User',
            position: formData.role,
            employeeId: formData.employeeId || '12345',
            department: formData.department,
            role: formData.role, // Explicitly set role for logic
        });
        // For both login and register, navigate to the main app
        navigate('MainApp');
    };

    return (
        <div style={styles.authContainer}>
            <div style={styles.authTopBg} />
            <div style={styles.authContent}>
                <div style={styles.authCard}>
                    <p style={styles.authTitle}>{isLogin ? 'Login' : 'Register'}</p>
                    <input style={styles.input} placeholder="Username" value={formData.username} onChange={e => handleInputChange('username', e.target.value)} />
                    {!isLogin && (
                        <>
                            <input style={styles.input} placeholder="Full Name" value={formData.fullName} onChange={e => handleInputChange('fullName', e.target.value)} />
                            <input style={styles.input} placeholder="Employee ID" value={formData.employeeId} onChange={e => handleInputChange('employeeId', e.target.value)} />
                             <select style={styles.input} value={formData.department} onChange={e => handleInputChange('department', e.target.value)}>
                                {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                            </select>
                            <select style={styles.input} value={formData.role} onChange={e => handleInputChange('role', e.target.value)}>
                                <option value="Staff">Staff</option>
                                <option value="HOD">HOD</option>
                                <option value="Class Advisor">Class Advisor</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </>
                    )}
                    <input style={styles.input} placeholder={isLogin ? "Password" : "Type Password"} type="password" />
                    {!isLogin && <input style={styles.input} placeholder="Retype Password" type="password" />}
                    
                    <button style={styles.mainButton} onClick={handleAuthAction}>
                        <span style={styles.mainButtonText}>{isLogin ? 'Login' : 'Register'}</span>
                    </button>

                    {isLogin && (
                        <>
                            <p style={styles.orText}>OR</p>
                            <button style={styles.secondaryButton} onClick={() => setIsLogin(false)}>
                                <span style={styles.secondaryButtonText}>Register</span>
                            </button>
                        </>
                    )}
                </div>
                 <div style={styles.logoContainer}>
                     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2R7bHsdVlhJda1oUOZ1NPc7lvacTuGPvHgg&s"  style={styles.logoImage} alt="College Logo" />
                     <div style={styles.logoTextContainer}>
                         
                     </div>
                 </div>
            </div>
        </div>
    );
};

// 2. Department/Home Screen
const DepartmentScreen = ({ navigate }) => {
    const departments = [
        { name: 'Aeronautical Engineering', icon: 'airplane' },
        { name: 'Artificial Intelligence & Data Science', icon: 'ai' },
        { name: 'Computer Science & Engineering', icon: 'computer' },
        { name: 'Mechanical Engineering', icon: 'wrench' },
        { name: 'Civil Engineering', icon: 'building' },
        { name: 'Electrical & Electronics Engineering', icon: 'bolt' },
        { name: 'Electronics & Communication Engineering', icon: 'satellite' },
        { name: 'Information Technology', icon: 'computer' },
        { name: 'Chemical Engineering', icon: 'flask' },
        { name: 'Biomedical Engineering', icon: 'heart' },
        { name: 'Mechatronics', icon: 'wrench' },
        { name: 'Automobile Engineering', icon: 'car' },
        { name: 'Biotechnology', icon: 'flask' },
    ];

    return (
        <div style={styles.screenContainer}>
            <WaveHeader title="Attendance Management Application" />
            <p style={styles.sectionTitle}>Department</p>
            <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 20 }}>
                {departments.map((dept, index) => (
                    <button key={index} style={styles.deptButton} onClick={() => navigate('Year', { department: dept.name })}>
                        <Icon name={dept.icon} size={28} color="#8e44ad" />
                        <span style={styles.deptButtonText}>{dept.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

// 3. Year Selection Screen
const YearScreen = ({ navigate, params }) => {
    const years = ['First Year', 'Second Year', 'Third Year', 'Fourth Year'];
    return (
        <div style={styles.screenContainer}>
            <WaveHeader title="Attendance Management Application" />
            <p style={styles.sectionTitle}>Year</p>
            <div style={styles.yearGrid}>
                {years.map((year, index) => (
                    <button key={index} style={styles.yearCard} onClick={() => navigate('Section', { ...params, year: year })}>
                        <span style={styles.yearCardNumber}>{index + 1}</span>
                        <span style={styles.yearCardText}>{year}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

// 4. Section Selection Screen
const SectionScreen = ({ navigate, params }) => {
    const sections = ['Section A', 'Section B'];
    const { year } = params;

    return (
        <div style={styles.screenContainer}>
            <WaveHeader title="Attendance Management Application" />
            <p style={styles.sectionTitle}>Section</p>
            <div style={styles.yearGrid}>
                {sections.map((section, index) => (
                    <button key={index} style={styles.yearCard} onClick={() => navigate('MainApp', { ...params, screen: 'Attendance', year, section })}>
                        <span style={styles.yearCardText}>{section}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};


// 5. Attendance Entry Screen
const AttendanceScreen = ({ addAttendanceRecord, year, section, department }) => {
    const [formData, setFormData] = useState({
        total: '', present: '', absent: '', onDuty: '', absentNumbers: ''
    });
    
    const handleInputChange = (field, value) => {
        const numericValue = value === '' ? '' : parseInt(value, 10);
        setFormData(prevData => ({
            ...prevData,
            [field]: isNaN(numericValue) ? '' : numericValue,
        }));
    };
    
    const handleSubmit = () => {
        if (!formData.total) {
            // NOTE: In a real app, use a modal or toast notification instead of alert().
            alert("Please enter the total number of students.");
            return;
        }
        const newRecord = { ...formData, date: new Date(), year, section, department };
        addAttendanceRecord(newRecord);
        // NOTE: In a real app, use a modal or toast notification instead of alert().
        alert("Report Submitted!");
        // Clear form after submission
        setFormData({ total: '', present: '', absent: '', onDuty: '', absentNumbers: '' });
    };

    return (
        <div style={styles.screenContainer}>
            <WaveHeader title={`${year} - ${section}`} />
            <div style={{ padding: 20, overflowY: 'auto' }}>
                <div style={styles.attendanceForm}>
                    <div style={styles.attendanceRow}>
                        <p>Total Number of Students:</p>
                        <input type="number" style={styles.attendanceInput} value={formData.total} onChange={(e) => handleInputChange('total', e.target.value)} />
                    </div>
                    <div style={styles.attendanceRow}>
                        <p>Total Number of Students Present:</p>
                        <input type="number" style={styles.attendanceInput} value={formData.present} onChange={(e) => handleInputChange('present', e.target.value)} />
                    </div>
                    <div style={styles.attendanceRow}>
                        <p>Total Number of Students Absents:</p>
                        <input type="number" style={styles.attendanceInput} value={formData.absent} onChange={(e) => handleInputChange('absent', e.target.value)} />
                    </div>
                    <div style={styles.attendanceRow}>
                        <p>Total Number of Students on OD:</p>
                        <input type="number" style={styles.attendanceInput} value={formData.onDuty} onChange={(e) => handleInputChange('onDuty', e.target.value)} />
                    </div>
                    <p style={{marginTop: 20, marginBottom: 10}}>Enter the Absent Students Register Numbers:</p>
                    <textarea
                        style={styles.largeInput}
                        rows={4}
                        value={formData.absentNumbers}
                        onChange={(e) => setFormData({...formData, absentNumbers: e.target.value})}
                    />
                    <button style={styles.submitButton} onClick={handleSubmit}>
                        <span style={styles.submitButtonText}>Submit</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

// 6. Uploads/Dashboard Screen
const UploadsScreen = ({ attendanceRecords, userProfile }) => {
    const [filter, setFilter] = useState('daily');
    const [reportData, setReportData] = useState({ total: 0, present: 0, absent: 0, onDuty: 0, absentNumbers: '' });

    // --- CSV Helper Functions ---
    const convertToCSV = (data) => {
        if (!data || data.length === 0) {
            return "";
        }
        const headers = ['Date', 'Department', 'Year', 'Section', 'Total Students', 'Present', 'Absent', 'On Duty', 'Absentee Numbers'];
        const rows = data.map(record => [
            new Date(record.date).toLocaleDateString(),
            record.department,
            record.year || 'N/A',
            record.section || 'N/A',
            record.total || 0,
            record.present || 0,
            record.absent || 0,
            record.onDuty || 0,
            `"${(record.absentNumbers || '').replace(/"/g, '""')}"` // Escape quotes
        ].join(','));
        return [headers.join(','), ...rows].join('\n');
    };

    const downloadCSV = (data, filename) => {
        const csvString = convertToCSV(data);
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    // --- Data Filtering Logic ---
    const getFilteredRecords = useCallback((records) => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        return records.filter(record => {
            const recordDate = new Date(record.date);
            switch(filter) {
                case 'daily':
                    return recordDate >= today;
                case 'weekly':
                    const weekStart = new Date(today);
                    weekStart.setDate(today.getDate() - today.getDay());
                    return recordDate >= weekStart;
                case 'monthly':
                    return recordDate.getMonth() === today.getMonth() && recordDate.getFullYear() === today.getFullYear();
                case 'yearly':
                    return recordDate.getFullYear() === today.getFullYear();
                default:
                    return true;
            }
        });
    }, [filter]);

    const handleDownload = () => {
        let recordsToDownload = [];
        let filename = `attendance_report_${filter}.csv`;

        if (userProfile.role === 'Admin') {
            recordsToDownload = getFilteredRecords(attendanceRecords);
            filename = `admin_all_departments_${filter}.csv`;
        } else if (userProfile.role === 'HOD') {
            const departmentRecords = attendanceRecords.filter(r => r.department === userProfile.department);
            recordsToDownload = getFilteredRecords(departmentRecords);
            const deptName = userProfile.department.replace(/ /g, '_');
            filename = `${deptName}_${filter}.csv`;
        } else { // Staff
            recordsToDownload = getFilteredRecords(attendanceRecords.filter(r => r.department === userProfile.department));
        }
        
        if(recordsToDownload.length === 0) {
            alert("No data available to download for the selected filter.");
            return;
        }

        downloadCSV(recordsToDownload, filename);
    };

    useEffect(() => {
        let relevantRecords = attendanceRecords;
        if (userProfile.role === 'HOD') {
            relevantRecords = attendanceRecords.filter(r => r.department === userProfile.department);
        } else if (userProfile.role === 'Staff' || userProfile.role === 'Class Advisor') {
            // For this demo, staff see their department's data.
            // In a real app, you might filter by staff ID.
            relevantRecords = attendanceRecords.filter(r => r.department === userProfile.department);
        }
        
        const filteredRecords = getFilteredRecords(relevantRecords);

        const aggregatedData = filteredRecords.reduce((acc, record) => {
            acc.total += record.total || 0;
            acc.present += record.present || 0;
            acc.absent += record.absent || 0;
            acc.onDuty += record.onDuty || 0;
            acc.absentNumbers += record.absentNumbers ? `${record.absentNumbers}, ` : '';
            return acc;
        }, { total: 0, present: 0, absent: 0, onDuty: 0, absentNumbers: '' });
        
        if (aggregatedData.absentNumbers.endsWith(', ')) {
            aggregatedData.absentNumbers = aggregatedData.absentNumbers.slice(0, -2);
        }

        setReportData(aggregatedData);

    }, [filter, attendanceRecords, userProfile, getFilteredRecords]);

    const handleShare = async (recipient) => {
        // 1. Check for Web Share API support for files
        if (!navigator.share || !navigator.canShare) {
            alert("Direct file sharing is not supported by your browser. Please use a mobile device or download the report and share it manually.");
            return;
        }
    
        // 2. Generate the records to share based on user role
        let recordsToShare = [];
        let departmentName = "All Departments";
        if (userProfile.role === 'Admin') {
            recordsToShare = getFilteredRecords(attendanceRecords);
        } else {
            departmentName = userProfile.department;
            const departmentRecords = attendanceRecords.filter(r => r.department === userProfile.department);
            recordsToShare = getFilteredRecords(departmentRecords);
        }
    
        if (recordsToShare.length === 0) {
            alert("No data available to share for the selected filter.");
            return;
        }
    
        // 3. Generate the CSV file
        const csvString = convertToCSV(recordsToShare);
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const filename = `${departmentName.replace(/ /g, '_')}_${filter}_report.csv`;
        const csvFile = new File([blob], filename, { type: 'text/csv' });
    
        // 4. Check if the browser can share this file type
        if (navigator.canShare({ files: [csvFile] })) {
            try {
                // 5. Use the Web Share API to send the file
                await navigator.share({
                    files: [csvFile],
                    title: `Attendance Report (${filter})`,
                    text: `Here is the ${filter} attendance report for ${departmentName}. Shared with ${recipient}.`,
                });
            } catch (error) {
                // This error is often triggered by the user cancelling the share dialog.
                // We only log an error if it's not an 'AbortError'.
                if (error.name !== 'AbortError') {
                    console.error(`Error sharing file: ${error.message}`);
                }
            }
        } else {
            alert("Your browser doesn't support sharing CSV files directly. Please download the report and share it manually.");
        }
    };
    
    const presentPercent = reportData.total > 0 ? ((reportData.present / reportData.total) * 100).toFixed(0) : 0;
    const absentPercent = reportData.total > 0 ? ((reportData.absent / reportData.total) * 100).toFixed(0) : 0;
    
    const getStrokeDasharray = (percent) => {
        const circumference = 2 * Math.PI * 50;
        const dash = (percent / 100) * circumference;
        return `${dash} ${circumference}`;
    };

    const FilterButton = ({ type, children }) => (
        <button style={filter === type ? styles.filterButtonActive : styles.filterButton} onClick={() => setFilter(type)}>
            {children}
        </button>
    );
    
    const getDownloadButtonText = () => {
        if (userProfile.role === 'Admin') return 'Download All Departments Report';
        if (userProfile.role === 'HOD') return 'Download Department Report';
        return 'Download My Report';
    }

    return (
     <div style={styles.screenContainer}>
         <WaveHeader title="Attendance Management Application" />
         <div style={styles.dashboardContent}>
             <div style={styles.filterContainer}>
                 <FilterButton type="daily">Daily</FilterButton>
                 <FilterButton type="weekly">Weekly</FilterButton>
                 <FilterButton type="monthly">Monthly</FilterButton>
                 <FilterButton type="yearly">Yearly</FilterButton>
             </div>
              <div style={styles.progressCard}>
                  <div style={styles.progressCircleContainer}>
                       <svg height="120" width="120" viewBox="0 0 120 120">
                           <circle cx="60" cy="60" r="50" stroke="#e6e6e6" strokeWidth="12" fill="none" />
                           <circle cx="60" cy="60" r="50" stroke="#3498db" strokeWidth="12" fill="none" strokeDasharray={getStrokeDasharray(presentPercent)} strokeLinecap="round" transform="rotate(-90 60 60)" />
                       </svg>
                       <p style={styles.progressText}>{presentPercent}%</p>
                  </div>
                  <p style={styles.progressLabel}>Overall Present Percent</p>
               </div>
               <div style={styles.progressCard}>
                   <div style={styles.progressCircleContainer}>
                        <svg height="80" width="80" viewBox="0 0 80 80">
                            <circle cx="40" cy="40" r="35" stroke="#fde0dd" strokeWidth="10" fill="none" />
                            <circle cx="40" cy="40" r="35" stroke="#e74c3c" strokeWidth="10" fill="none" strokeDasharray={getStrokeDasharray(absentPercent)} strokeLinecap="round" transform="rotate(-90 40 40)" />
                        </svg>
                   </div>
                   <p style={styles.progressLabel}>Overall Absent Percentage</p>
               </div>
              <button style={styles.submitButton} onClick={handleDownload}>
                  <Icon name="download" size={20} color="#fff" />
                  <span style={{...styles.submitButtonText, marginLeft: 10}}>{getDownloadButtonText()}</span>
              </button>
             <div style={styles.shareButtonsContainer}>
                 <button style={styles.shareButton} onClick={() => handleShare('HOD')}>
                     <span style={styles.submitButtonText}>Share to HOD</span>
                 </button>
                 <button style={styles.shareButton} onClick={() => handleShare('Class Advisor')}>
                     <span style={styles.submitButtonText}>Share to Class.Advi.</span>
                 </button>
             </div>
         </div>
     </div>
    );
};

// 7. Settings Screen
const SettingsScreen = ({ navigate, userProfile }) => {
    const { name, position, employeeId, department } = userProfile;
    const initial = name ? name.charAt(0).toUpperCase() : 'U';

    const ProfileDetail = ({ icon, label, value }) => (
        <div style={styles.profileDetailRow}>
            <Icon name={icon} size={24} color="#555" />
            <div style={styles.profileDetailTextContainer}>
                <p style={styles.profileDetailLabel}>{label}</p>
                <p style={styles.profileDetailValue}>{value || 'Not Set'}</p>
            </div>
        </div>
    );

    return (
        <div style={styles.screenContainer}>
            <WaveHeader title="Faculty Profile" />
            <div style={styles.settingsContent}>
                <div style={styles.profileCard}>
                    <div style={styles.profileCardHeader}>
                        <div style={styles.avatar}>
                            <p style={styles.avatarLetter}>{initial}</p>
                        </div>
                        <div style={{marginLeft: 15}}>
                            <p style={styles.profileName}>{name || 'User Name'}</p>
                            <p style={styles.profilePosition}>{position || 'Position'}</p>
                        </div>
                    </div>
                    <div style={styles.profileDetailsContainer}>
                        <ProfileDetail icon="id" label="Employee ID" value={employeeId} />
                        <ProfileDetail icon="briefcase" label="Department" value={department} />
                        <ProfileDetail icon="user" label="Role" value={userProfile.role} />
                    </div>
                </div>
                <button style={styles.logoutButton} onClick={() => navigate('Auth')}>
                    <span style={styles.logoutButtonText}>Logout</span>
                </button>
            </div>
        </div>
    );
};

// --- NAVIGATION SETUP ---

// Main Tabbed Application View
const MainApp = ({ navigate, params, attendanceRecords, addAttendanceRecord, userProfile, currentYear, currentSection, currentDepartment }) => {
    const [activeTab, setActiveTab] = useState('Home');

    useEffect(() => {
        // This effect allows navigation to a specific tab from outside
        if (params && params.screen) {
            setActiveTab(params.screen);
        }
    }, [params]);


    const renderScreen = () => {
        switch(activeTab) {
            case 'Home':
                return <DepartmentScreen navigate={navigate} />;
            case 'Attendance':
                return <AttendanceScreen addAttendanceRecord={addAttendanceRecord} year={currentYear} section={currentSection} department={currentDepartment} />;
            case 'Uploads':
                return <UploadsScreen attendanceRecords={attendanceRecords} userProfile={userProfile} />;
            case 'Settings':
                return <SettingsScreen navigate={navigate} userProfile={userProfile} />;
            default:
                return <DepartmentScreen navigate={navigate} />;
        }
    }

    const tabs = ['Home', 'Attendance', 'Uploads', 'Settings'];
    const tabIcons = { Home: 'home', Attendance: 'people', Uploads: 'cloud', Settings: 'settings' };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <div style={{ flex: 1, overflow: 'hidden' }}>
                {renderScreen()}
            </div>
            <div style={styles.tabBar}>
                {tabs.map(tab => (
                    <button key={tab} style={styles.tabButton} onClick={() => setActiveTab(tab)}>
                        <Icon name={tabIcons[tab]} size={24} color={activeTab === tab ? '#8e44ad' : 'gray'} />
                    </button>
                ))}
            </div>
        </div>
    );
};

// Main App component with simple state-based routing
export default function App() {
    const [page, setPage] = useState('Auth');
    const [params, setParams] = useState({});
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [userProfile, setUserProfile] = useState({
        name: 'Default User',
        position: 'Staff',
        employeeId: '0000',
        department: 'Not Assigned',
        role: 'Staff',
    });
    const [currentDepartment, setCurrentDepartment] = useState('');
    const [currentYear, setCurrentYear] = useState('');
    const [currentSection, setCurrentSection] = useState('');


    const addAttendanceRecord = (newRecord) => {
        // Add department from the current user's profile to the record
        setAttendanceRecords(prevRecords => [...prevRecords, newRecord]);
    };

    const navigate = (newPage, newParams = {}) => {
        if (newParams.department) setCurrentDepartment(newParams.department);
        if (newParams.year) setCurrentYear(newParams.year);
        if (newParams.section) setCurrentSection(newParams.section);
        
        setPage(newPage);
        setParams(newParams);
    };

    const renderPage = () => {
        switch (page) {
            case 'Auth':
                return <AuthScreen navigate={navigate} setUserProfile={setUserProfile} />;
            case 'MainApp':
                return <MainApp 
                    navigate={navigate} 
                    params={params} 
                    attendanceRecords={attendanceRecords} 
                    addAttendanceRecord={addAttendanceRecord} 
                    userProfile={userProfile} 
                    currentYear={currentYear} 
                    currentSection={currentSection} 
                    currentDepartment={currentDepartment} 
                />;
            case 'Year':
                return <YearScreen navigate={navigate} params={params} />;
            case 'Section':
                return <SectionScreen navigate={navigate} params={params} />;
            default:
                return <AuthScreen navigate={navigate} setUserProfile={setUserProfile} />;
        }
    };

    return <div style={{fontFamily: 'sans-serif'}}>{renderPage()}</div>;
}


// --- STYLES (as JS objects for inline styling) ---

const styles = {
    // Auth Screen
    authContainer: { height: '100vh', backgroundColor: '#fff', position: 'relative' },
    authTopBg: { height: '50%', backgroundColor: '#8e44ad' },
    authContent: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    authCard: {
        width: '85%',
        maxWidth: 400,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 25,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
    },
    authTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, margin: 0 },
    input: {
        width: '100%',
        boxSizing: 'border-box',
        backgroundColor: '#f0f0f0',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
        border: '1px solid #eee',
        appearance: 'none',
    },
    mainButton: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
        border: '1px solid #ddd',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        cursor: 'pointer',
    },
    mainButtonText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    orText: { margin: '15px 0', color: 'grey' },
    secondaryButton: {
        width: '100%',
        backgroundColor: '#8e44ad',
        borderRadius: 15,
        padding: 15,
        alignItems: 'center',
        border: 'none',
        cursor: 'pointer',
    },
    secondaryButtonText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 20,
    },
    logoImage: {
        width: 150,
        height: 70,
        marginRight: 15,
        borderRadius: 10,
    },
    logoTextContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    logoText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#555',
        margin: 0,
    },
    logoSubText: {
        fontSize: 14,
        color: '#777',
        letterSpacing: 1,
        margin: 0,
    },

    // General Screen
    screenContainer: { display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#f5f5f5' },
    headerContainer: {
        height: 180,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
    },
    headerTitle: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 30,
        lineHeight: 1.4,
        position: 'relative',
        padding: '0 20px',
        margin: 0,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 20,
        marginBottom: 10,
    },

    // Department Screen
    deptButton: {
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '15px 20px',
        borderRadius: 15,
        margin: '8px 20px',
        boxShadow: '0 1px 5px rgba(0,0,0,0.1)',
        border: 'none',
        width: 'calc(100% - 40px)',
        textAlign: 'left',
        cursor: 'pointer',
    },
    deptButtonText: {
        fontSize: 16,
        marginLeft: 15,
        whiteSpace: 'normal',
        flex: 1,
    },

    // Year Screen
    yearGrid: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: '0 10px',
    },
    yearCard: {
        width: '45%',
        height: 150,
        backgroundColor: '#8e44ad',
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
    },
    yearCardNumber: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    yearCardText: {
        fontSize: 18,
    },
    
    // Attendance Screen
    attendanceForm: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
    },
    attendanceRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    attendanceInput: {
        width: 80,
        height: 40,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        border: '1px solid #ddd',
        textAlign: 'center',
        fontSize: 16,
    },
    largeInput: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        height: 100,
        width: '100%',
        boxSizing: 'border-box',
        border: '1px solid #ddd',
        padding: 10,
        fontFamily: 'sans-serif',
        fontSize: 14,
    },
    submitButton: {
        backgroundColor: '#8e44ad',
        borderRadius: 15,
        padding: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        border: 'none',
        color: '#fff',
        width: '100%',
        cursor: 'pointer',
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    
    // Uploads/Dashboard Screen
    dashboardContent: {
        flex: 1,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'auto'
    },
    filterContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    filterButton: {
        flex: 1,
        padding: '10px 5px',
        margin: '0 5px',
        borderRadius: 10,
        border: '1px solid #8e44ad',
        backgroundColor: '#fff',
        color: '#8e44ad',
        cursor: 'pointer',
        fontSize: 14,
    },
    filterButtonActive: {
        flex: 1,
        padding: '10px 5px',
        margin: '0 5px',
        borderRadius: 10,
        border: '1px solid #8e44ad',
        backgroundColor: '#8e44ad',
        color: '#fff',
        cursor: 'pointer',
        fontSize: 14,
    },
    progressCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    progressCircleContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressText: {
        position: 'absolute',
        fontSize: 24,
        fontWeight: 'bold',
        margin: 0,
    },
    progressLabel: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 10,
        margin: 0,
        textAlign: 'center'
    },
    shareButtonsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    shareButton: {
        backgroundColor: '#8e44ad',
        borderRadius: 15,
        padding: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '48%',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
    },

    // Settings Screen
    settingsContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
    },
    profileCard: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        boxSizing: 'border-box',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    profileCardHeader: {
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #eee',
        paddingBottom: 20,
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#8e44ad',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
    },
    avatarLetter: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
        margin: 0,
    },
    profileName: {
        fontSize: 22,
        fontWeight: 'bold',
        margin: 0,
    },
    profilePosition: {
        color: 'grey',
        margin: 0,
        fontSize: 16,
    },
    profileDetailsContainer: {
        paddingTop: 20,
    },
    profileDetailRow: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 15,
    },
    profileDetailTextContainer: {
        marginLeft: 15,
    },
    profileDetailLabel: {
        margin: 0,
        color: 'grey',
        fontSize: 14,
    },
    profileDetailValue: {
        margin: 0,
        fontSize: 16,
        fontWeight: '500',
    },
    logoutButton: {
        backgroundColor: '#8e44ad',
        borderRadius: 15,
        padding: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 'auto',
        border: 'none',
        cursor: 'pointer',
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    
    // Tab Bar
    tabBar: {
        display: 'flex',
        height: 60,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#fff',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
        flexShrink: 0,
    },
    tabButton: {
        flex: 1,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
    }
};
