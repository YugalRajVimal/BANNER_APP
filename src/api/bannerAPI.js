const getBannerURL ='https://banner-app-api.onrender.com/bannerDetails';
const updateBannerURL = 'https://banner-app-api.onrender.com/updateBannerDetails';

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