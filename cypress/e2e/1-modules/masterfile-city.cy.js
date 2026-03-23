import { LoginPage } from "../../support/pages/LoginPage";
import { DashboardPage } from "../../support/pages/DashboardPage";
import { CityPage } from "../../support/pages/CityPage";
import testData from "../../fixtures/generated/masterfile-city-negative-test-data.json";

const MAX_POSITION_TYPE_LENGTH = 25;

// This makes a new city that is a little different every time.
// That helps us avoid duplicates when we run the test again.
//const buildUniqueName = (baseName) => {
  // This small number at the end makes the name unique.
  //const uniqueToken = `${Date.now().toString().slice(-6)}${Cypress._.random(10, 99)}`;
  // We save space for the unique number and one blank space.
 // const allowedBaseLength = MAX_POSITION_TYPE_LENGTH - uniqueToken.length - 1;
  // If the original name is too long, cut it short so it still fits in the box.
  //const trimmedBaseName = baseName.slice(0, allowedBaseLength).trimEnd();

 // return `${trimmedBaseName} ${uniqueToken}`;
//};

// We take each group of test data from the JSON file.
// If one group is missing, we use an empty list so the test does not crash.
const {
  pageLoad = [],
  add = [],
  edit = [],
  delete: deleteCases = [],
  validation = [],
  duplicate = [],
  spacesOnly = [],
  maxLength = [],
  editToDuplicate = [],
} = testData;

describe("HR Master File - City", () => {
  beforeEach(() => {
    // Before every test, open the app, log in, and go to the Position Type page.
    LoginPage.open();
    LoginPage.loginAsHrUser();
    LoginPage.assertLoginSuccess();

    DashboardPage.openHrApp();
    DashboardPage.openMasterFile();
    DashboardPage.openCity();

    CityPage.assertPageLoaded();
  });

  describe("Page Load", () => {
    pageLoad.forEach(({ testCaseId, description }) => {
      it(`[${testCaseId}] ${description}`, () => {
        // Check if the page opened the right way.
        // We know it worked if the table and Add button can be seen.
        CityPage.assertPageLoaded();
      });
    });
  });

  describe("Add City Masterfile", () => {
    add.forEach(({ testCaseId, description, name }) => {
      it(`[${testCaseId}] ${description}`, () => {
        // Make the city special so it does not match old test data.
        //const uniquecity = buildUniqueName(city);
        
        // Open the Add form, type the name, and save it.
        CityPage.clickAdd();
        CityPage.enterCity(name);
        CityPage.clickSave();
        
        // Check if the save worked and the new row shows in the table.
        CityPage.assertSuccessMessage("Successfully");
        CityPage.confirmSuccessful();
        CityPage.assertRowVisible(name);
      });
    });
  });

  describe("Edit City Masterfile", () => {
    edit.forEach(({ testCaseId, description, originalName, updatedcity }) => {
      it(`[${testCaseId}] ${description}`, () => {
        // Make two special names:
        // one for the old value and one for the new value.
       // const originalUniqueName = buildUniqueName(originalName);
       // const updatedUniqueName = buildUniqueName(updatedcity);

        // First, create a row that we can edit.
        CityPage.createCity(originalUniqueName);
        CityPage.assertSuccessMessage("Successfully");
        CityPage.confirmSuccessful();

        // Then change the old city to the new city.
        CityPage.clickEdit(originalUniqueName);
        CityPage.enterCity(updatedUniqueName);
        CityPage.clickUpdate();

        // Check if the update worked.
        CityPage.assertSuccessMessage("updated");
        CityPage.confirmSuccessful();
        CityPage.assertRowVisible(updatedUniqueName);
      });
    });
  });

  describe("Delete City Masterfile", () => {
    deleteCases.forEach(({ testCaseId, description, name }) => {
      it(`[${testCaseId}] ${description}`, () => {
        // Make a special row just for this delete test.
       // const uniqueName = buildUniqueName(city);

        CityPage.createCity(name);
        CityPage.assertSuccessMessage("Successfully");
        CityPage.confirmSuccessful();

        // Delete the row we just made.
        CityPage.clickDelete(name);
        CityPage.confirmDelete();

        // Check if the row is gone.
        CityPage.assertSuccessMessage("Successfully deleted");
        CityPage.confirmSuccessfulDelete();
        CityPage.assertRowNotVisible(name);
      });
    });
  });

  describe("Validation", () => {
    validation.forEach(({ testCaseId, description, requiredNameMessage }) => {
      it(`[${testCaseId}] ${description}`, () => {
        // Try to save without typing anything.
        // The app should show an error because the city is required.
        CityPage.clickAdd();
        CityPage.clickSave();

        CityPage.assertErrorMessage(requiredNameMessage);
      });
    });
  });

  describe("Duplicate Validation", () => {
    duplicate.forEach(({ testCaseId, description, name }) => {
      it(`[${testCaseId}] ${description}`, () => {
        // Make the first row.
        //const uniqueName = buildUniqueName(city);

        CityPage.createCity(name);
        CityPage.assertSuccessMessage("Successfully");
        CityPage.confirmSuccessful();

        // Try to save the exact same city again.
        // The app should say this city already exists.
        CityPage.clickAdd();
        CityPage.enterCity(name);
        CityPage.clickSave();

        CityPage.assertErrorMessage(
          `City  (${name}) already Exist`,
        );
      });
    });
  });

  describe("Spaces-Only Validation", () => {
    spacesOnly.forEach(
      ({ testCaseId, description, name, requiredNameMessage }) => {
        it(`[${testCaseId}] ${description}`, () => {
          // Type only blank spaces.
          // The app should treat this like an empty value.
          CityPage.clickAdd();
          CityPage.enterCity(name);
          CityPage.clickSave();

          CityPage.assertErrorMessage(requiredNameMessage);
        });
      },
    );
  });

  describe("Max Length Validation", () => {
    maxLength.forEach(
      ({
        testCaseId,
        description,
        name,
        maxLength = MAX_POSITION_TYPE_LENGTH,
      }) => {
        it(`[${testCaseId}] ${description}`, () => {
          // Type a city that is too long for the box.
          // The box should keep only the first 30 characters.
          CityPage.clickAdd();
          CityPage.enterCity(name);
          CityPage.assertNameIsLimitedTo(name, maxLength);
        });
      },
    );
  });

  describe("Edit Duplicate Validation", () => {
    editToDuplicate.forEach(
      ({ testCaseId, description, firstName, secondName }) => {
        it(`[${testCaseId}] ${description}`, () => {
          // Make two different rows.
          // Later, we will try to turn the second one into a copy of the first one.
         // const firstUniqueName = buildUniqueName(firstName);
        //  const secondUniqueName = buildUniqueName(secondName);

          CityPage.createCity(firstUniqueName);
          CityPage.assertSuccessMessage("Successfully");
          CityPage.confirmSuccessful();

          CityPage.createCity(secondUniqueName);
          CityPage.assertSuccessMessage("Successfully");
          CityPage.confirmSuccessful();

          // Change the second row so it has the same name as the first row.
          // The app should stop us and show a duplicate error.
          CityPage.clickEdit(secondUniqueName);
          CityPage.enterCity(firstUniqueName);
          CityPage.clickUpdate();

          CityPage.assertErrorMessage(
            `City (${firstUniqueName}) already Exist`,
          );
        });
      },
    );
  });
});
