export default {
    methods: {
        getData(fetchReq, callback) {
            this.$api.query(fetchReq,
                (res) => {
                    callback(res.data);
                },
                (error) => {
                    callback(false);
                    console.log('Error Occurred');
                }
            );
        },
        postData(action, fetchReq, callback) {
            this.$api.command(action, fetchReq,
                (res) => {
                    callback(res);
                },
                (error) => {
                    callback(false);
                    console.log('Error Occurred');
                }
            );
        }
    }
}