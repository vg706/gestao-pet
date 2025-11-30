// styles/styles.jsx
import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // ===== ESTILOS GLOBAIS =====
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: { 
    backgroundColor: 'white', 
    borderRadius: 12, 
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: { 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: { 
        elevation: 3,
      },
    }),
  },
  buttonPrimary: { 
    backgroundColor: '#3498db', 
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonSuccess: {
    backgroundColor: '#27ae60',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDanger: {
    backgroundColor: '#e74c3c',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#2c3e50',
    marginBottom: 8,
  },
  textSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 20,
  },
  textLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dce0e4',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#dce0e4',
    borderRadius: 8,
    backgroundColor: '#fafafa',
    marginBottom: 8,
  },
  picker: {
    height: 50,
  },

  // ===== HEADER STYLES (para _layout.jsx) - NOVOS ESTILOS =====
  headerStyle: {
    backgroundColor: '#3498db',
  },
  headerTitleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  headerTintColor: {
    color: 'white',
  },

  // ===== LOGIN (app/index.jsx) =====
  loginContainer: { 
    flex: 1, 
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    padding: 16,
  },
  loginTitle: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 30,
  },
  
  // ===== EMPLOYEE HOME (app/employee/index.jsx) =====
  employeeContainer: { 
    flex: 1, 
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  resultsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  tutorItem: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tutorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  searchButton: {
    color: '#3498db',
    fontSize: 14,
    fontWeight: '600',
  },
  animalItem: {
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e8ed',
    ...Platform.select({
      ios: { 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: { 
        elevation: 2,
      },
    }),
  },
  animalName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  animalDetails: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  registerButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    textAlign: 'center',
    color: '#95a5a6',
    fontSize: 16,
    marginTop: 50,
    paddingHorizontal: 20,
  },

  // ===== REGISTER APPOINTMENT (app/employee/register-appointment.jsx) =====
  registerAppointmentContainer: {
    flex: 1, 
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  animalInfo: {
    backgroundColor: 'white', 
    borderRadius: 12, 
    padding: 20,
    marginBottom: 16,
    backgroundColor: '#e8f4fd',
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
    ...Platform.select({
      ios: { 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: { 
        elevation: 3,
      },
    }),
  },
  formContainer: {
    backgroundColor: 'white', 
    borderRadius: 12, 
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: { 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: { 
        elevation: 3,
      },
    }),
  },
  textInputMultiline: {
    borderWidth: 1,
    borderColor: '#dce0e4',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
    minHeight: 40,
    maxHeight: 120,
    textAlignVertical: 'top',
  },
  vaccineSection: {
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 50,
  },

  // ===== SIGNUP (app/signup/index.jsx) =====
  signupContainer: {
    flex: 1, 
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    padding: 16,
  },
  signupCard: {
    backgroundColor: 'white', 
    borderRadius: 12, 
    padding: 20,
    marginBottom: 16,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    ...Platform.select({
      ios: { 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: { 
        elevation: 3,
      },
    }),
  },
  signupTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 8,
  },
  signupSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 30,
  },
  signupButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  requiredField: {
    color: '#e74c3c',
  },
  passwordHint: {
    fontSize: 12,
    color: '#95a5a6',
    marginTop: 4,
    fontStyle: 'italic',
  },

  // ===== ANIMAL DETAILS (app/tutor/animal-details.jsx) =====
  animalDetailsContainer: {
    flex: 1, 
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  animalHeader: {
    backgroundColor: 'white', 
    borderRadius: 12, 
    padding: 20,
    marginBottom: 16,
    backgroundColor: '#f0f7ff',
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
    ...Platform.select({
      ios: { 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: { 
        elevation: 3,
      },
    }),
  },
  animalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  animalInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  animalInfoLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  animalInfoValue: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    marginTop: 8,
  },
  appointmentCard: {
    backgroundColor: 'white', 
    borderRadius: 12, 
    padding: 20,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#27ae60',
    ...Platform.select({
      ios: { 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: { 
        elevation: 3,
      },
    }),
  },
  appointmentDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  appointmentVaccine: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '600',
    marginBottom: 6,
  },
  appointmentReport: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
    marginBottom: 8,
  },
  employeeInfo: {
    fontSize: 12,
    color: '#95a5a6',
    fontStyle: 'italic',
  },
  emptyStateContainer: {
    backgroundColor: 'white', 
    borderRadius: 12, 
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    paddingVertical: 40,
    ...Platform.select({
      ios: { 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: { 
        elevation: 3,
      },
    }),
  },
  emptyStateText: {
    fontSize: 16,
    color: '#95a5a6',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#bdc3c7',
    textAlign: 'center',
  },

  // ===== TUTOR HOME (app/tutor/index.jsx) =====
  tutorHomeContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  tutorHeader: {
    marginBottom: 24,
  },
  tutorMainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  tutorSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    lineHeight: 22,
  },
  animalCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
    ...Platform.select({
      ios: { 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: { 
        elevation: 3,
      },
    }),
  },
  animalCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  animalIcon: {
    marginRight: 10,
    fontSize: 18,
  },
  animalCardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  animalCardDetail: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  addPetButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#3498db',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    ...Platform.select({
      ios: { 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: { 
        elevation: 3,
      },
    }),
  },
  addPetButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addPetIcon: {
    marginRight: 10,
  },
  addPetText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498db',
  },
  addPetSubtext: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 4,
  },
  petsList: {
    flex: 1,
  },
  emptyPetsState: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    ...Platform.select({
      ios: { 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: { 
        elevation: 3,
      },
    }),
  },
  emptyPetsText: {
    fontSize: 16,
    color: '#95a5a6',
    textAlign: 'center',
    marginBottom: 8,
  },

  // ===== REGISTER ANIMAL (app/tutor/register-animal.jsx) =====
  registerAnimalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  registerAnimalHeader: {
    marginBottom: 20,
  },
  registerAnimalTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  registerAnimalForm: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    ...Platform.select({
      ios: { 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: { 
        elevation: 3,
      },
    }),
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#dce0e4',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#fafafa',
    marginBottom: 8,
  },
  datePickerText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  datePlaceholder: {
    color: '#95a5a6',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#e74c3c',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveAnimalButton: {
    flex: 1,
    backgroundColor: '#27ae60',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  webDateInput: {
    borderWidth: 1,
    borderColor: '#dce0e4',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
    marginBottom: 8,
  },
  formSection: {
    marginBottom: 20,
  },
});