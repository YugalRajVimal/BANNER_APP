const getBannerURL ='http://localhost:8080/bannerDetails';
const updateBannerURL = 'http://localhost:8080/updateBannerDetails';

const getBannerDeatils = async () => {
    try {
        const response = await fetch(getBannerURL);
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
    
}

const updateBannerDetails = async (newBannerDetails) => {
    try {
        const response = await fetch(updateBannerURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBannerDetails)
        });
        return response;
    } catch (error) {
        return error;
    }
}

export {getBannerDeatils, updateBannerDetails};